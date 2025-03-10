/**
 * Gets cToken from an address
 * @param {string} at Address where your cToken is deployed
 * @param {Libraries} libraries The deployed libraries
 */
const atAddress = async (at, libraries) => {
  const cToken = await ethers.getContractFactory('cToken', {
    libraries: {
      ProtoUtilV1: libraries.protoUtilV1.address,
      ValidationLibV1: libraries.validationLib.address
    }
  })

  return await cToken.attach(at)
}

module.exports = { atAddress }
