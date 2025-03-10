/* eslint-disable no-unused-expressions */

const BigNumber = require('bignumber.js')
const { ethers, network } = require('hardhat')
const composer = require('./composer')
const { helper, cToken, key, ipfs, sample } = require('../util')

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const constants = {
  DAYS: 86400,
  cTokens: {},
  reportInfo: {
    foo: 'bar'
  },
  coverAmounts: {
    kimberly: 500_000,
    lewis: 20_000
  },
  stakes: {
    yes: {
      reporting: 250,
      contributions: {
        chris: [101, 200],
        emily: [400],
        george: [6000, 200],
        isabel: [300]
      }
    },
    no: {
      reporting: 251,
      contributions: {
        bob: [100, 200],
        david: [20000],
        franklin: [10, 200],
        henry: [3000],
        john: [300, 200]
      }
    }
  }
}

const sumOf = (x) => helper.ether(x.reporting + Object.values(x.contributions).flat().reduce((y, z) => y + z))

const coverKey = key.toBytes32('Compound Finance Cover')

/**
 * @type {Contracts}
 */
let contracts = {}

const attest = async (id, user, stake) => {
  await contracts.nep.connect(user).approve(contracts.governance.address, helper.ether(stake))
  await contracts.governance.connect(user).attest(coverKey, id, helper.ether(stake))
}

const refute = async (id, user, stake) => {
  await contracts.nep.connect(user).approve(contracts.governance.address, helper.ether(stake))
  await contracts.governance.connect(user).refute(coverKey, id, helper.ether(stake))
}

describe('Governance Stories', () => {
  before(async () => {
    contracts = await composer.initializer.initialize()
    const [_o, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, kimberly, lewis] = await ethers.getSigners() // eslint-disable-line

    const info = await ipfs.write(sample.info)

    // console.info(`https://ipfs.infura.io/ipfs/${ipfs.toIPFShash(info)}`)

    const stakeWithFee = helper.ether(10_000)
    const initialAssuranceAmount = helper.ether(1_000_000)
    const initialLiquidity = helper.ether(4_000_000)
    const reportingPeriod = 7 * constants.DAYS

    // Submit approvals
    await contracts.nep.approve(contracts.stakingContract.address, stakeWithFee)
    await contracts.assuranceToken.approve(contracts.assuranceContract.address, initialAssuranceAmount)
    await contracts.wxDai.approve(contracts.cover.address, initialLiquidity)

    // Create a new cover
    await contracts.cover.addCover(coverKey, info, reportingPeriod, stakeWithFee, contracts.assuranceToken.address, initialAssuranceAmount, initialLiquidity)

    // Add provision
    const provision = helper.ether(1_000_001)

    await contracts.nep.approve(contracts.provisionContract.address, provision)
    await contracts.provisionContract.increaseProvision(coverKey, provision)

    // Purchase a cover
    let args = [coverKey, 2, helper.ether(constants.coverAmounts.kimberly)]
    let fee = (await contracts.policy.getCoverFee(...args)).fee

    ; (await contracts.policy.getCToken(args[0], args[1])).cToken.should.equal(helper.zerox)

    await contracts.wxDai.connect(kimberly).approve(contracts.policy.address, fee)
    await contracts.policy.connect(kimberly).purchaseCover(...args)

    let at = (await contracts.policy.getCToken(args[0], args[1])).cToken
    constants.cTokens.kimberly = await cToken.atAddress(at, contracts.libs)

    // Purchase a cover
    args = [coverKey, 3, helper.ether(constants.coverAmounts.lewis)]
    fee = (await contracts.policy.getCoverFee(...args)).fee

    await contracts.wxDai.connect(lewis).approve(contracts.policy.address, fee)
    await contracts.policy.connect(lewis).purchaseCover(...args)

    at = (await contracts.policy.getCToken(args[0], args[1])).cToken
    constants.cTokens.lewis = await cToken.atAddress(at, contracts.libs)
  })

  it('can not claim until an incident occurs', async () => {
    const [_o, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, lewis] = await ethers.getSigners() // eslint-disable-line

    const balance = await constants.cTokens.lewis.balanceOf(lewis.address)
    constants.cTokens.lewis.connect(lewis).approve(contracts.claimsProcessor.address, balance)

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await contracts.claimsProcessor.connect(lewis).claim(constants.cTokens.kimberly.address, coverKey, incidentDate, balance)
      .should.be.revertedWith('Claim denied')
  })

  it('the cover `Compound Finance` has no known incidents', async () => {
    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)
    incidentDate.should.equal(0)

    const status = await contracts.governance.getStatus(coverKey)
    status.should.equal(helper.coverStatus.normal)
  })

  it('alice submitted an incident with 250 stake', async () => {
    const [_, alice] = await ethers.getSigners() // eslint-disable-line

    const stake = helper.ether(constants.stakes.yes.reporting)
    const info = await ipfs.write(constants.reportInfo)

    const previous = await contracts.nep.balanceOf(alice.address)

    await contracts.nep.connect(alice).approve(contracts.governance.address, stake)
    await contracts.governance.connect(alice).report(coverKey, info, helper.ether(1))
      .should.be.revertedWith('Stake insufficient')

    await contracts.governance.connect(alice).report(coverKey, info, stake)

    const current = await contracts.nep.balanceOf(alice.address)
    previous.sub(current).should.equal(stake)
  })

  it('no reporter should be accepted other than alice', async () => {
    const [_, _a, bob] = await ethers.getSigners() // eslint-disable-line

    const stake = helper.ether(constants.stakes.yes.reporting)
    const info = await ipfs.write(constants.reportInfo)

    await contracts.nep.connect(bob).approve(contracts.governance.address, stake)
    await contracts.governance.connect(bob).report(coverKey, info, stake)
      .should.be.revertedWith('Actively Reporting')
  })

  it('the cover is now reporting and has an incident date', async () => {
    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)
    incidentDate.should.be.gt(0)

    const status = await contracts.governance.getStatus(coverKey)
    status.should.equal(helper.coverStatus.incidentHappened)
  })

  it('alice is the reporter', async () => {
    const [_, alice] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)
    const reporter = await contracts.governance.getReporter(coverKey, incidentDate)

    reporter.should.equal(alice.address)
  })

  it('bob disputed the current incident with 250 stake', async () => {
    const [_, _a, bob] = await ethers.getSigners() // eslint-disable-line
    const stake = helper.ether(constants.stakes.no.reporting)
    const info = await ipfs.write(constants.reportInfo)
    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await contracts.nep.connect(bob).approve(contracts.governance.address, stake)

    await contracts.governance.connect(bob).dispute(coverKey, incidentDate, info, helper.ether(1))
      .should.be.revertedWith('Stake insufficient')

    await contracts.governance.connect(bob).dispute(coverKey, incidentDate, info, stake)
  })

  it('no disputer is accepted other than bob', async () => {
    const [_, _a, _b, chris] = await ethers.getSigners() // eslint-disable-line
    const stake = helper.ether(constants.stakes.no.reporting)
    const info = await ipfs.write(constants.reportInfo)
    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await contracts.nep.connect(chris).approve(contracts.governance.address, stake)
    await contracts.governance.connect(chris).dispute(coverKey, incidentDate, info, stake)
      .should.be.revertedWith('Already disputed')
  })

  it('bob became the new reporter', async () => {
    const [_, _a, bob] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)
    const reporter = await contracts.governance.getReporter(coverKey, incidentDate)

    reporter.should.equal(bob.address)

    const status = await contracts.governance.getStatus(coverKey)
    status.should.equal(helper.coverStatus.falseReporting)
  })

  it('david, franklin, and john refuted the incident reporting', async () => {
    const [_, _a, _b, _c, david, _e, franklin, _g, _h, _i, john] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await refute(incidentDate, david, constants.stakes.no.contributions.david[0])
    await refute(incidentDate, franklin, constants.stakes.no.contributions.franklin[0])
    await refute(incidentDate, john, constants.stakes.no.contributions.john[0])
  })

  it('chris, isabel, and george attested the incident reporting', async () => {
    const [_, _a, _b, chris, _d, _e, _f, george, _h, isabel] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await attest(incidentDate, chris, constants.stakes.yes.contributions.chris[0])
    await attest(incidentDate, isabel, constants.stakes.yes.contributions.isabel[0])
    await attest(incidentDate, george, constants.stakes.yes.contributions.george[0])
  })

  it('bob, franklin, and john refuted the incident reporting', async () => {
    const [_, _a, bob, _c, _d, _e, franklin, _g, _h, _i, john] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await refute(incidentDate, bob, constants.stakes.no.contributions.bob[0])
    await refute(incidentDate, franklin, constants.stakes.no.contributions.franklin[1])
    await refute(incidentDate, john, constants.stakes.no.contributions.john[1])
  })

  it('emily and chris attested the incident reporting', async () => {
    const [_, _a, _b, chris, _d, emily] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await attest(incidentDate, emily, constants.stakes.yes.contributions.emily[0])
    await attest(incidentDate, chris, constants.stakes.yes.contributions.chris[1])
  })

  it('bob and henry refuted the incident reporting', async () => {
    const [_, _a, bob, _c, _d, _e, _f, _g, henry] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await refute(incidentDate, bob, constants.stakes.no.contributions.bob[1])
    await refute(incidentDate, henry, constants.stakes.no.contributions.henry[0])
  })

  it('george attested the incident reporting', async () => {
    const [_, _a, _b, _c, _d, _e, _f, george] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await attest(incidentDate, george, constants.stakes.yes.contributions.george[1])
  })

  it('the stakes are correctly set', async () => {
    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)
    const [yes, no] = await contracts.governance.getStakes(coverKey, incidentDate)

    yes.should.equal(sumOf(constants.stakes.yes))
    no.should.equal(sumOf(constants.stakes.no))
  })

  it('individual stakes are also correct', async () => {
    const [_o, _a, bob, chris, david, emily, franklin, george, harry, isabel, john] = await ethers.getSigners() // eslint-disable-line
    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    const ensureStake = async (account, y, n) => {
      const [yes, no] = await contracts.governance.getStakesOf(coverKey, incidentDate, account.address)

      y && yes.should.equal(y)
      n && no.should.equal(n)
    }

    const sum = helper.sum

    await ensureStake(bob, 0, helper.ether(constants.stakes.no.reporting + sum(constants.stakes.no.contributions.bob)))
    await ensureStake(chris, helper.ether(sum(constants.stakes.yes.contributions.chris)))
    await ensureStake(david, 0, helper.ether(sum(constants.stakes.no.contributions.david)))
    await ensureStake(emily, helper.ether(sum(constants.stakes.yes.contributions.emily)))
    await ensureStake(franklin, 0, helper.ether(sum(constants.stakes.no.contributions.franklin)))
    await ensureStake(george, helper.ether(sum(constants.stakes.yes.contributions.george)))
    await ensureStake(harry, 0, helper.ether(sum(constants.stakes.no.contributions.henry)))
    await ensureStake(isabel, helper.ether(sum(constants.stakes.yes.contributions.isabel)))
    await ensureStake(john, 0, helper.ether(sum(constants.stakes.no.contributions.john)))
  })

  it('unable to claim because the incident is disputed (majority disagree)', async () => {
    const [_o, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, kimberly] = await ethers.getSigners() // eslint-disable-line

    const balance = await constants.cTokens.kimberly.balanceOf(kimberly.address)
    constants.cTokens.kimberly.connect(kimberly).approve(contracts.claimsProcessor.address, balance)

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await contracts.claimsProcessor.connect(kimberly).claim(constants.cTokens.kimberly.address, coverKey, incidentDate, balance)
      .should.be.revertedWith('Claim denied')
  })

  it('george again attested with a very large stake', async () => {
    const [_, _a, _b, _c, _d, _e, _f, george] = await ethers.getSigners() // eslint-disable-line

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await attest(incidentDate, george, 100_000)
  })

  it('unable to claim because the reporting period is still acive', async () => {
    const [_o, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, kimberly] = await ethers.getSigners() // eslint-disable-line

    const balance = await constants.cTokens.kimberly.balanceOf(kimberly.address)
    constants.cTokens.kimberly.connect(kimberly).approve(contracts.claimsProcessor.address, balance)

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    await contracts.claimsProcessor.connect(kimberly).claim(constants.cTokens.kimberly.address, coverKey, incidentDate, balance)
      .should.be.revertedWith('Reporting still active')
  })

  it('kimberly successfully received payout during the claim period', async () => {
    const [_o, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, kimberly] = await ethers.getSigners() // eslint-disable-line

    const balance = await constants.cTokens.kimberly.balanceOf(kimberly.address)
    constants.cTokens.kimberly.connect(kimberly).approve(contracts.claimsProcessor.address, balance)

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)
    await network.provider.send('evm_increaseTime', [7 * constants.DAYS])

    const before = await contracts.wxDai.balanceOf(kimberly.address)

    await contracts.claimsProcessor.connect(kimberly).claim(constants.cTokens.kimberly.address, coverKey, incidentDate, balance)
    const after = await contracts.wxDai.balanceOf(kimberly.address)

    after.should.be.gt(before)

    after.sub(before).should.equal(helper.ether(constants.coverAmounts.kimberly))
  })

  it('lewis was unable to claim after the expiry period', async () => {
    const [_o, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, lewis] = await ethers.getSigners() // eslint-disable-line

    const balance = await constants.cTokens.lewis.balanceOf(lewis.address)
    constants.cTokens.lewis.connect(lewis).approve(contracts.claimsProcessor.address, balance)

    const incidentDate = await contracts.governance.getActiveIncidentDate(coverKey)

    // This causes the claim period to expire
    await network.provider.send('evm_increaseTime', [7 * constants.DAYS])

    await contracts.claimsProcessor.connect(lewis).claim(constants.cTokens.lewis.address, coverKey, incidentDate, balance)
      .should.be.revertedWith('Claim period has expired')
  })
})
