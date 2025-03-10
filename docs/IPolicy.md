# IPolicy.sol

View Source: [contracts/interfaces/IPolicy.sol](../contracts/interfaces/IPolicy.sol)

**↗ Extends: [IMember](IMember.md)**
**↘ Derived Contracts: [Policy](Policy.md)**

**IPolicy**

## Functions

- [purchaseCover(bytes32 key, uint256 coverDuration, uint256 amountToCover)](#purchasecover)
- [getCoverFee(bytes32 key, uint256 coverDuration, uint256 amountToCover)](#getcoverfee)
- [getCoverPoolSummary(bytes32 key)](#getcoverpoolsummary)
- [getCToken(bytes32 key, uint256 coverDuration)](#getctoken)
- [getCTokenByExpiryDate(bytes32 key, uint256 expiryDate)](#getctokenbyexpirydate)
- [getCommitment(bytes32 key)](#getcommitment)
- [getCoverable(bytes32 key)](#getcoverable)
- [getExpiryDate(uint256 today, uint256 coverDuration)](#getexpirydate)

### purchaseCover

Purchase cover for the specified amount. <br /> <br />
 When you purchase covers, you recieve equal amount of cTokens back.
 You need the cTokens to claim the cover when resolution occurs.
 Each unit of cTokens are fully redeemable at 1:1 ratio to the given
 stablecoins (like wxDai, DAI, USDC, or BUSD) based on the chain.

```solidity
function purchaseCover(bytes32 key, uint256 coverDuration, uint256 amountToCover) external nonpayable
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
  ) external returns (address);
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
    returns (
      uint256 fee,
      uint256 utilizationRatio,
      uint256 totalAvailableLiquidity,
      uint256 coverRatio,
      uint256 floor,
      uint256 ceiling,
      uint256 rate
    );
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
function getCoverPoolSummary(bytes32 key) external view returns (uint256[] memory _values);
```
</details>

### getCToken

```solidity
function getCToken(bytes32 key, uint256 coverDuration) external view
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
function getCToken(bytes32 key, uint256 coverDuration) external view returns (address cToken, uint256 expiryDate);
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
function getCTokenByExpiryDate(bytes32 key, uint256 expiryDate) external view returns (address cToken);
```
</details>

### getCommitment

```solidity
function getCommitment(bytes32 key) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCommitment(bytes32 key) external view returns (uint256);
```
</details>

### getCoverable

```solidity
function getCoverable(bytes32 key) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getCoverable(bytes32 key) external view returns (uint256);
```
</details>

### getExpiryDate

Gets the expiry date based on cover duration

```solidity
function getExpiryDate(uint256 today, uint256 coverDuration) external pure
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
function getExpiryDate(uint256 today, uint256 coverDuration) external pure returns (uint256);
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
