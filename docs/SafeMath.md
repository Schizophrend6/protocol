# SafeMath.sol

View Source: [openzeppelin-solidity/contracts/utils/math/SafeMath.sol](../openzeppelin-solidity/contracts/utils/math/SafeMath.sol)

**SafeMath**

Wrappers over Solidity's arithmetic operations.
 NOTE: `SafeMath` is no longer needed starting with Solidity 0.8. The compiler
 now has built in overflow checking.

## Functions

- [tryAdd(uint256 a, uint256 b)](#tryadd)
- [trySub(uint256 a, uint256 b)](#trysub)
- [tryMul(uint256 a, uint256 b)](#trymul)
- [tryDiv(uint256 a, uint256 b)](#trydiv)
- [tryMod(uint256 a, uint256 b)](#trymod)
- [add(uint256 a, uint256 b)](#add)
- [sub(uint256 a, uint256 b)](#sub)
- [mul(uint256 a, uint256 b)](#mul)
- [div(uint256 a, uint256 b)](#div)
- [mod(uint256 a, uint256 b)](#mod)
- [sub(uint256 a, uint256 b, string errorMessage)](#sub)
- [div(uint256 a, uint256 b, string errorMessage)](#div)
- [mod(uint256 a, uint256 b, string errorMessage)](#mod)

### tryAdd

Returns the addition of two unsigned integers, with an overflow flag.
 _Available since v3.4._

```solidity
function tryAdd(uint256 a, uint256 b) internal pure
returns(bool, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }
```
</details>

### trySub

Returns the substraction of two unsigned integers, with an overflow flag.
 _Available since v3.4._

```solidity
function trySub(uint256 a, uint256 b) internal pure
returns(bool, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }
```
</details>

### tryMul

Returns the multiplication of two unsigned integers, with an overflow flag.
 _Available since v3.4._

```solidity
function tryMul(uint256 a, uint256 b) internal pure
returns(bool, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }
```
</details>

### tryDiv

Returns the division of two unsigned integers, with a division by zero flag.
 _Available since v3.4._

```solidity
function tryDiv(uint256 a, uint256 b) internal pure
returns(bool, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }
```
</details>

### tryMod

Returns the remainder of dividing two unsigned integers, with a division by zero flag.
 _Available since v3.4._

```solidity
function tryMod(uint256 a, uint256 b) internal pure
returns(bool, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }
```
</details>

### add

Returns the addition of two unsigned integers, reverting on
 overflow.
 Counterpart to Solidity's `+` operator.
 Requirements:
 - Addition cannot overflow.

```solidity
function add(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }
```
</details>

### sub

Returns the subtraction of two unsigned integers, reverting on
 overflow (when the result is negative).
 Counterpart to Solidity's `-` operator.
 Requirements:
 - Subtraction cannot overflow.

```solidity
function sub(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }
```
</details>

### mul

Returns the multiplication of two unsigned integers, reverting on
 overflow.
 Counterpart to Solidity's `*` operator.
 Requirements:
 - Multiplication cannot overflow.

```solidity
function mul(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }
```
</details>

### div

Returns the integer division of two unsigned integers, reverting on
 division by zero. The result is rounded towards zero.
 Counterpart to Solidity's `/` operator.
 Requirements:
 - The divisor cannot be zero.

```solidity
function div(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }
```
</details>

### mod

Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
 reverting when dividing by zero.
 Counterpart to Solidity's `%` operator. This function uses a `revert`
 opcode (which leaves remaining gas untouched) while Solidity uses an
 invalid opcode to revert (consuming all remaining gas).
 Requirements:
 - The divisor cannot be zero.

```solidity
function mod(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }
```
</details>

### sub

Returns the subtraction of two unsigned integers, reverting with custom message on
 overflow (when the result is negative).
 CAUTION: This function is deprecated because it requires allocating memory for the error
 message unnecessarily. For custom revert reasons use {trySub}.
 Counterpart to Solidity's `-` operator.
 Requirements:
 - Subtraction cannot overflow.

```solidity
function sub(uint256 a, uint256 b, string errorMessage) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }
```
</details>

### div

Returns the integer division of two unsigned integers, reverting with custom message on
 division by zero. The result is rounded towards zero.
 Counterpart to Solidity's `%` operator. This function uses a `revert`
 opcode (which leaves remaining gas untouched) while Solidity uses an
 invalid opcode to revert (consuming all remaining gas).
 Counterpart to Solidity's `/` operator. Note: this function uses a
 `revert` opcode (which leaves remaining gas untouched) while Solidity
 uses an invalid opcode to revert (consuming all remaining gas).
 Requirements:
 - The divisor cannot be zero.

```solidity
function div(uint256 a, uint256 b, string errorMessage) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }
```
</details>

### mod

Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
 reverting with custom message when dividing by zero.
 CAUTION: This function is deprecated because it requires allocating memory for the error
 message unnecessarily. For custom revert reasons use {tryMod}.
 Counterpart to Solidity's `%` operator. This function uses a `revert`
 opcode (which leaves remaining gas untouched) while Solidity uses an
 invalid opcode to revert (consuming all remaining gas).
 Requirements:
 - The divisor cannot be zero.

```solidity
function mod(uint256 a, uint256 b, string errorMessage) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
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
