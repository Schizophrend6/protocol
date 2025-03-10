# Policy Admin Contract (PolicyAdmin.sol)

View Source: [contracts/core/policy/PolicyAdmin.sol](../contracts/core/policy/PolicyAdmin.sol)

**↗ Extends: [IPolicyAdmin](IPolicyAdmin.md), [Recoverable](Recoverable.md)**

**PolicyAdmin**

The policy admin contract enables the owner (governance)
 to set the policy rate and fee info.

## Functions

- [constructor(IStore store)](#)
- [setPolicyRates(uint256 floor, uint256 ceiling)](#setpolicyrates)
- [setPolicyRatesByKey(bytes32 key, uint256 floor, uint256 ceiling)](#setpolicyratesbykey)
- [getPolicyRates(bytes32 key)](#getpolicyrates)
- [version()](#version)
- [getName()](#getname)

### 

Constructs this contract

```solidity
function (IStore store) public nonpayable Recoverable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| store | IStore | Provide the store contract instance | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(IStore store) Recoverable(store) {
    this;
  }
```
</details>

### setPolicyRates

Sets policy rates. This feature is only accessible by owner or protocol owner.

```solidity
function setPolicyRates(uint256 floor, uint256 ceiling) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| floor | uint256 | The lowest cover fee rate fallback | 
| ceiling | uint256 | The highest cover fee rate fallback | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setPolicyRates(uint256 floor, uint256 ceiling) external override {
    _mustBeOwnerOrProtoOwner(); // Ensures that the caller is either the owner or protocol owner

    s.setUintByKey(ProtoUtilV1.NS_COVER_POLICY_RATE_FLOOR, floor);
    s.setUintByKey(ProtoUtilV1.NS_COVER_POLICY_RATE_CEILING, ceiling);

    emit PolicyRateSet(floor, ceiling);
  }
```
</details>

### setPolicyRatesByKey

Sets policy rates for the given cover key. This feature is only accessible by owner or protocol owner.

```solidity
function setPolicyRatesByKey(bytes32 key, uint256 floor, uint256 ceiling) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 
| floor | uint256 | The lowest cover fee rate for this cover | 
| ceiling | uint256 | The highest cover fee rate for this cover | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setPolicyRatesByKey(
    bytes32 key,
    uint256 floor,
    uint256 ceiling
  ) external override {
    _mustBeOwnerOrProtoOwner(); // Ensures that the caller is either the owner or protocol owner

    s.setUintByKeys(ProtoUtilV1.NS_COVER_POLICY_RATE_FLOOR, key, floor);
    s.setUintByKeys(ProtoUtilV1.NS_COVER_POLICY_RATE_CEILING, key, ceiling);

    emit CoverPolicyRateSet(key, floor, ceiling);
  }
```
</details>

### getPolicyRates

Gets the cover policy rates for the given cover key

```solidity
function getPolicyRates(bytes32 key) external view
returns(floor uint256, ceiling uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getPolicyRates(bytes32 key) external view override returns (uint256 floor, uint256 ceiling) {
    return s.getPolicyRates(key);
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
    return ProtoUtilV1.CNAME_POLICY_ADMIN;
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
