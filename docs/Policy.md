# Policy Contract (Policy.sol)

View Source: [contracts/core/policy/Policy.sol](../contracts/core/policy/Policy.sol)

**↗ Extends: [IPolicy](IPolicy.md), [Recoverable](Recoverable.md)**

**Policy**

The policy contract enables you to a purchase cover

## Functions

- [constructor(IStore store)](#)
- [purchaseCover(bytes32 key, uint256 coverDuration, uint256 amountToCover)](#purchasecover)
- [getCToken(bytes32 key, uint256 coverDuration)](#getctoken)
- [getCTokenByExpiryDate(bytes32 key, uint256 expiryDate)](#getctokenbyexpirydate)
- [_getCTokenOrDeploy(bytes32 key, uint256 coverDuration)](#_getctokenordeploy)
- [getExpiryDate(uint256 today, uint256 coverDuration)](#getexpirydate)
- [getCommitment(bytes32 )](#getcommitment)
- [getCoverable(bytes32 )](#getcoverable)
- [_getCoverFeeRate(uint256 floor, uint256 ceiling, uint256 coverRatio)](#_getcoverfeerate)
- [getCoverFee(bytes32 key, uint256 coverDuration, uint256 amountToCover)](#getcoverfee)
- [_getCoverFee(bytes32 key, uint256 coverDuration, uint256 amountToCover)](#_getcoverfee)
- [getCoverPoolSummary(bytes32 key)](#getcoverpoolsummary)
- [getHarmonicMean(uint256 x, uint256 y, uint256 z)](#getharmonicmean)
- [version()](#version)
- [getName()](#getname)

### 

```solidity
function (IStore store) public nonpayable Recoverable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| store | IStore |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(IStore store) Recoverable(store) {
    this;
  }
```
</details>

### purchaseCover

Purchase cover for the specified amount. <br /> <br />
 When you purchase covers, you recieve equal amount of cTokens back.
 You need the cTokens to claim the cover when resolution occurs.
 Each unit of cTokens are fully redeemable at 1:1 ratio to the given
 stablecoins (like wxDai, DAI, USDC, or BUSD) based on the chain.

```solidity
function purchaseCover(bytes32 key, uint256 coverDuration, uint256 amountToCover) external nonpayable nonReentrant 
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Enter the cover key you wish to purchase the policy for | 
| coverDuration | uint256 | Enter the number of months to cover. Accepted values: 1-3. | 
| amountToCover | uint256 | Enter the amount of the stablecoin `liquidityToken` to cover. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function purchaseCover(
    bytes32 key,
    uint256 coverDuration,
    uint256 amountToCover
  ) external override nonReentrant returns (address) {
    require(coverDuration > 0 && coverDuration <= 3, "Invalid cover duration");

    (uint256 fee, , , , , , ) = _getCoverFee(key, coverDuration, amountToCover);
    ICToken cToken = _getCTokenOrDeploy(key, coverDuration);

    address liquidityToken = s.getLiquidityToken();
    require(liquidityToken != address(0), "Cover liquidity uninitialized");

    // Transfer the fee to cToken contract
    IERC20(liquidityToken).ensureTransferFrom(super._msgSender(), address(cToken), fee);

    cToken.mint(key, super._msgSender(), amountToCover);
    return address(cToken);
  }
```
</details>

### getCToken

```solidity
function getCToken(bytes32 key, uint256 coverDuration) public view
returns(cToken address, expiryDate uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 
| coverDuration | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCToken(bytes32 key, uint256 coverDuration) public view override returns (address cToken, uint256 expiryDate) {
    expiryDate = getExpiryDate(block.timestamp, coverDuration); // solhint-disable-line
    bytes32 k = abi.encodePacked(ProtoUtilV1.NS_COVER_CTOKEN, key, expiryDate).toKeccak256();

    cToken = s.getAddress(k);
  }
```
</details>

### getCTokenByExpiryDate

```solidity
function getCTokenByExpiryDate(bytes32 key, uint256 expiryDate) external view
returns(cToken address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 
| expiryDate | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCTokenByExpiryDate(bytes32 key, uint256 expiryDate) external view override returns (address cToken) {
    bytes32 k = abi.encodePacked(ProtoUtilV1.NS_COVER_CTOKEN, key, expiryDate).toKeccak256();

    cToken = s.getAddress(k);
  }
```
</details>

### _getCTokenOrDeploy

Gets the instance of cToken or deploys a new one based on the cover expiry timestamp

```solidity
function _getCTokenOrDeploy(bytes32 key, uint256 coverDuration) private nonpayable
returns(contract ICToken)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Enter the cover key | 
| coverDuration | uint256 | Enter the number of months to cover. Accepted values: 1-3. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _getCTokenOrDeploy(bytes32 key, uint256 coverDuration) private returns (ICToken) {
    (address cToken, uint256 expiryDate) = getCToken(key, coverDuration);

    if (cToken != address(0)) {
      return ICToken(cToken);
    }

    ICTokenFactory factory = s.getCTokenFactory();
    cToken = factory.deploy(s, key, expiryDate);
    s.addMember(cToken);

    return ICToken(cToken);
  }
```
</details>

### getExpiryDate

Gets the expiry date based on cover duration

```solidity
function getExpiryDate(uint256 today, uint256 coverDuration) public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| today | uint256 | Enter the current timestamp | 
| coverDuration | uint256 | Enter the number of months to cover. Accepted values: 1-3. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getExpiryDate(uint256 today, uint256 coverDuration) public pure override returns (uint256) {
    // Get the day of the month
    (, , uint256 day) = BokkyPooBahsDateTimeLibrary.timestampToDate(today);

    // Cover duration of 1 month means current month
    // unless today is the 25th calendar day or later
    uint256 monthToAdd = coverDuration - 1;

    if (day >= 25) {
      // Add one month if today is the 25th calendar day or more
      monthToAdd += 1;
    }

    // Add the number of months to reach to any future date in that month
    uint256 futureDate = BokkyPooBahsDateTimeLibrary.addMonths(today, monthToAdd);

    // Only get the year and month from the future date
    (uint256 year, uint256 month, ) = BokkyPooBahsDateTimeLibrary.timestampToDate(futureDate);

    // Obtain the number of days for the given month and year
    uint256 daysInMonth = BokkyPooBahsDateTimeLibrary._getDaysInMonth(year, month);

    // Get the month end date
    return BokkyPooBahsDateTimeLibrary.timestampFromDateTime(year, month, daysInMonth, 23, 59, 59);
  }
```
</details>

### getCommitment

```solidity
function getCommitment(bytes32 ) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCommitment(
    bytes32 /*key*/
  ) external view override returns (uint256) {
    this;
    revert("Not implemented");
  }
```
</details>

### getCoverable

```solidity
function getCoverable(bytes32 ) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCoverable(
    bytes32 /*key*/
  ) external view override returns (uint256) {
    this;
    revert("Not implemented");
  }
```
</details>

### _getCoverFeeRate

Gets the harmonic mean rate of the given ratios. Stops/truncates at min/max values.

```solidity
function _getCoverFeeRate(uint256 floor, uint256 ceiling, uint256 coverRatio) private pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| floor | uint256 | The lowest cover fee rate | 
| ceiling | uint256 | The highest cover fee rate | 
| coverRatio | uint256 | Enter the ratio of the cover vs liquidity | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _getCoverFeeRate(
    uint256 floor,
    uint256 ceiling,
    uint256 coverRatio
  ) private pure returns (uint256) {
    // COVER FEE RATE = HARMEAN(FLOOR, COVER RATIO, CEILING)
    uint256 rate = getHarmonicMean(floor, coverRatio, ceiling);

    if (rate < floor) {
      return floor;
    }

    if (rate > ceiling) {
      return ceiling;
    }

    return rate;
  }
```
</details>

### getCoverFee

Gets the cover fee info for the given cover key, duration, and amount

```solidity
function getCoverFee(bytes32 key, uint256 coverDuration, uint256 amountToCover) external view
returns(fee uint256, utilizationRatio uint256, totalAvailableLiquidity uint256, coverRatio uint256, floor uint256, ceiling uint256, rate uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Enter the cover key | 
| coverDuration | uint256 | Enter the number of months to cover. Accepted values: 1-3. | 
| amountToCover | uint256 | Enter the amount of the stablecoin `liquidityToken` to cover. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCoverFee(
    bytes32 key,
    uint256 coverDuration,
    uint256 amountToCover
  )
    external
    view
    override
    returns (
      uint256 fee,
      uint256 utilizationRatio,
      uint256 totalAvailableLiquidity,
      uint256 coverRatio,
      uint256 floor,
      uint256 ceiling,
      uint256 rate
    )
  {
    return _getCoverFee(key, coverDuration, amountToCover);
  }
```
</details>

### _getCoverFee

Gets the cover fee info for the given cover key, duration, and amount

```solidity
function _getCoverFee(bytes32 key, uint256 coverDuration, uint256 amountToCover) private view
returns(fee uint256, utilizationRatio uint256, totalAvailableLiquidity uint256, coverRatio uint256, floor uint256, ceiling uint256, rate uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Enter the cover key | 
| coverDuration | uint256 | Enter the number of months to cover. Accepted values: 1-3. | 
| amountToCover | uint256 | Enter the amount of the stablecoin `liquidityToken` to cover. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _getCoverFee(
    bytes32 key,
    uint256 coverDuration,
    uint256 amountToCover
  )
    private
    view
    returns (
      uint256 fee,
      uint256 utilizationRatio,
      uint256 totalAvailableLiquidity,
      uint256 coverRatio,
      uint256 floor,
      uint256 ceiling,
      uint256 rate
    )
  {
    require(coverDuration <= 3, "Invalid duration");

    (floor, ceiling) = s.getPolicyRates(key);

    require(floor > 0 && ceiling > floor, "Policy rate config error");

    uint256[] memory values = s.getCoverPoolSummary(key);

    // AMOUNT_IN_COVER_POOL - COVER_COMMITMENT > AMOUNT_TO_COVER
    require(values[0] - values[1] > amountToCover, "Insufficient fund");

    // UTILIZATION RATIO = COVER_COMMITMENT / AMOUNT_IN_COVER_POOL
    utilizationRatio = (1 ether * values[1]) / values[0];

    // TOTAL AVAILABLE LIQUIDITY = AMOUNT_IN_COVER_POOL - COVER_COMMITMENT + (NEP_REWARD_POOL_SUPPORT * NEP_PRICE) + (ASSURANCE_POOL_SUPPORT * ASSURANCE_TOKEN_PRICE * ASSURANCE_POOL_WEIGHT)
    totalAvailableLiquidity = values[0] - values[1] + ((values[2] * values[3]) / 1 ether) + ((values[4] * values[5] * values[6]) / (1 ether * 1 ether));

    // COVER RATIO = UTILIZATION_RATIO + COVER_DURATION * AMOUNT_TO_COVER / AVAILABLE_LIQUIDITY
    coverRatio = utilizationRatio + ((1 ether * coverDuration * amountToCover) / totalAvailableLiquidity);

    rate = _getCoverFeeRate(floor, ceiling, coverRatio);
    fee = (amountToCover * rate * coverDuration) / (12 ether);
  }
```
</details>

### getCoverPoolSummary

Returns the values of the given cover key

```solidity
function getCoverPoolSummary(bytes32 key) external view
returns(_values uint256[])
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCoverPoolSummary(bytes32 key) external view override returns (uint256[] memory _values) {
    return s.getCoverPoolSummary(key);
  }
```
</details>

### getHarmonicMean

Returns the harmonic mean of the supplied values.

```solidity
function getHarmonicMean(uint256 x, uint256 y, uint256 z) public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| x | uint256 |  | 
| y | uint256 |  | 
| z | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getHarmonicMean(
    uint256 x,
    uint256 y,
    uint256 z
  ) public pure returns (uint256) {
    require(x > 0 && y > 0 && z > 0, "Invalid arg");
    return 3e36 / ((1e36 / (x)) + (1e36 / (y)) + (1e36 / (z)));
  }
```
</details>

### version

Version number of this contract

```solidity
function version() external pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function version() external pure override returns (bytes32) {
    return "v0.1";
  }
```
</details>

### getName

Name of this contract

```solidity
function getName() public pure
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getName() public pure override returns (bytes32) {
    return ProtoUtilV1.CNAME_POLICY;
  }
```
</details>

## Contracts

* [Address](Address.md)
* [BokkyPooBahsDateTimeLibrary](BokkyPooBahsDateTimeLibrary.md)
* [Commission](Commission.md)
* [Context](Context.md)
* [Controller](Controller.md)
* [Cover](Cover.md)
* [CoverAssurance](CoverAssurance.md)
* [CoverBase](CoverBase.md)
* [CoverProvision](CoverProvision.md)
* [CoverStake](CoverStake.md)
* [CoverUtilV1](CoverUtilV1.md)
* [cToken](cToken.md)
* [cTokenFactory](cTokenFactory.md)
* [Destroyable](Destroyable.md)
* [ERC20](ERC20.md)
* [FakeStore](FakeStore.md)
* [FakeToken](FakeToken.md)
* [Governance](Governance.md)
* [GovernanceUtilV1](GovernanceUtilV1.md)
* [ICommission](ICommission.md)
* [ICover](ICover.md)
* [ICoverAssurance](ICoverAssurance.md)
* [ICoverProvision](ICoverProvision.md)
* [ICoverStake](ICoverStake.md)
* [ICToken](ICToken.md)
* [ICTokenFactory](ICTokenFactory.md)
* [IERC20](IERC20.md)
* [IERC20Metadata](IERC20Metadata.md)
* [IGovernance](IGovernance.md)
* [IMember](IMember.md)
* [IPolicy](IPolicy.md)
* [IPolicyAdmin](IPolicyAdmin.md)
* [IPriceDiscovery](IPriceDiscovery.md)
* [IProtocol](IProtocol.md)
* [IReporter](IReporter.md)
* [IStore](IStore.md)
* [IVault](IVault.md)
* [IVaultFactory](IVaultFactory.md)
* [IWitness](IWitness.md)
* [MaliciousToken](MaliciousToken.md)
* [Migrations](Migrations.md)
* [NTransferUtilV2](NTransferUtilV2.md)
* [NTransferUtilV2Intermediate](NTransferUtilV2Intermediate.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [Policy](Policy.md)
* [PolicyAdmin](PolicyAdmin.md)
* [PolicyManager](PolicyManager.md)
* [PriceDiscovery](PriceDiscovery.md)
* [Protocol](Protocol.md)
* [ProtoUtilV1](ProtoUtilV1.md)
* [Recoverable](Recoverable.md)
* [ReentrancyGuard](ReentrancyGuard.md)
* [Reporter](Reporter.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [Store](Store.md)
* [StoreBase](StoreBase.md)
* [StoreKeyUtil](StoreKeyUtil.md)
* [Vault](Vault.md)
* [VaultFactory](VaultFactory.md)
* [VaultPod](VaultPod.md)
* [Witness](Witness.md)
