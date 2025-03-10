# ICoverProvision.sol

View Source: [contracts/interfaces/ICoverProvision.sol](../contracts/interfaces/ICoverProvision.sol)

**↗ Extends: [IMember](IMember.md)**
**↘ Derived Contracts: [CoverProvision](CoverProvision.md)**

**ICoverProvision**

**Events**

```js
event ProvisionIncreased(bytes32  key, uint256  previous, uint256  current);
event ProvisionDecreased(bytes32  key, uint256  previous, uint256  current);
```

## Functions

- [increaseProvision(bytes32 key, uint256 amount)](#increaseprovision)
- [decreaseProvision(bytes32 key, uint256 amount)](#decreaseprovision)
- [getProvision(bytes32 key)](#getprovision)

### increaseProvision

Increases NEP provision for the given cover key.
 This feature is accessible only to the contract owner (governance).

```solidity
function increaseProvision(bytes32 key, uint256 amount) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Provide the cover key you wish to increase the provision of | 
| amount | uint256 | Specify the amount of NEP tokens you would like to add | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function increaseProvision(bytes32 key, uint256 amount) external;
```
</details>

### decreaseProvision

Decreases NEP provision for the given cover key
 This feature is accessible only to the contract owner (governance).

```solidity
function decreaseProvision(bytes32 key, uint256 amount) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Provide the cover key you wish to decrease the provision from | 
| amount | uint256 | Specify the amount of NEP tokens you would like to decrease | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function decreaseProvision(bytes32 key, uint256 amount) external;
```
</details>

### getProvision

Gets the NEP provision amount for the given cover key

```solidity
function getProvision(bytes32 key) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| key | bytes32 | Enter the cover key to get the provision | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getProvision(bytes32 key) external view returns (uint256);
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
