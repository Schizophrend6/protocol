# Address.sol

View Source: [openzeppelin-solidity/contracts/utils/Address.sol](../openzeppelin-solidity/contracts/utils/Address.sol)

**Address**

Collection of functions related to the address type

## Functions

- [isContract(address account)](#iscontract)
- [sendValue(address payable recipient, uint256 amount)](#sendvalue)
- [functionCall(address target, bytes data)](#functioncall)
- [functionCall(address target, bytes data, string errorMessage)](#functioncall)
- [functionCallWithValue(address target, bytes data, uint256 value)](#functioncallwithvalue)
- [functionCallWithValue(address target, bytes data, uint256 value, string errorMessage)](#functioncallwithvalue)
- [functionStaticCall(address target, bytes data)](#functionstaticcall)
- [functionStaticCall(address target, bytes data, string errorMessage)](#functionstaticcall)
- [functionDelegateCall(address target, bytes data)](#functiondelegatecall)
- [functionDelegateCall(address target, bytes data, string errorMessage)](#functiondelegatecall)
- [_verifyCallResult(bool success, bytes returndata, string errorMessage)](#_verifycallresult)

### isContract

Returns true if `account` is a contract.
 [IMPORTANT]
 ====
 It is unsafe to assume that an address for which this function returns
 false is an externally-owned account (EOA) and not a contract.
 Among others, `isContract` will return false for the following
 types of addresses:
  - an externally-owned account
  - a contract in construction
  - an address where a contract will be created
  - an address where a contract lived, but was destroyed
 ====

```solidity
function isContract(address account) internal view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
    }
```
</details>

### sendValue

Replacement for Solidity's `transfer`: sends `amount` wei to
 `recipient`, forwarding all available gas and reverting on errors.
 https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
 of certain opcodes, possibly making contracts go over the 2300 gas limit
 imposed by `transfer`, making them unable to receive funds via
 `transfer`. {sendValue} removes this limitation.
 https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
 IMPORTANT: because control is transferred to `recipient`, care must be
 taken to not create reentrancy vulnerabilities. Consider using
 {ReentrancyGuard} or the
 https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].

```solidity
function sendValue(address payable recipient, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| recipient | address payable |  | 
| amount | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }
```
</details>

### functionCall

Performs a Solidity function call using a low level `call`. A
 plain`call` is an unsafe replacement for a function call: use this
 function instead.
 If `target` reverts with a revert reason, it is bubbled up by this
 function (like regular Solidity function calls).
 Returns the raw returned data. To convert to the expected return value,
 use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
 Requirements:
 - `target` must be a contract.
 - calling `target` with `data` must not revert.
 _Available since v3.1._

```solidity
function functionCall(address target, bytes data) internal nonpayable
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }
```
</details>

### functionCall

Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
 `errorMessage` as a fallback revert reason when `target` reverts.
 _Available since v3.1._

```solidity
function functionCall(address target, bytes data, string errorMessage) internal nonpayable
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }
```
</details>

### functionCallWithValue

Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
 but also transferring `value` wei to `target`.
 Requirements:
 - the calling contract must have an ETH balance of at least `value`.
 - the called Solidity function must be `payable`.
 _Available since v3.1._

```solidity
function functionCallWithValue(address target, bytes data, uint256 value) internal nonpayable
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 
| value | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }
```
</details>

### functionCallWithValue

Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
 with `errorMessage` as a fallback revert reason when `target` reverts.
 _Available since v3.1._

```solidity
function functionCallWithValue(address target, bytes data, uint256 value, string errorMessage) internal nonpayable
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 
| value | uint256 |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: value }(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }
```
</details>

### functionStaticCall

Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
 but performing a static call.
 _Available since v3.3._

```solidity
function functionStaticCall(address target, bytes data) internal view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }
```
</details>

### functionStaticCall

Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
 but performing a static call.
 _Available since v3.3._

```solidity
function functionStaticCall(address target, bytes data, string errorMessage) internal view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionStaticCall(address target, bytes memory data, string memory errorMessage) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.staticcall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }
```
</details>

### functionDelegateCall

Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
 but performing a delegate call.
 _Available since v3.4._

```solidity
function functionDelegateCall(address target, bytes data) internal nonpayable
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }
```
</details>

### functionDelegateCall

Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
 but performing a delegate call.
 _Available since v3.4._

```solidity
function functionDelegateCall(address target, bytes data, string errorMessage) internal nonpayable
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| target | address |  | 
| data | bytes |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function functionDelegateCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }
```
</details>

### _verifyCallResult

```solidity
function _verifyCallResult(bool success, bytes returndata, string errorMessage) private pure
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| success | bool |  | 
| returndata | bytes |  | 
| errorMessage | string |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _verifyCallResult(bool success, bytes memory returndata, string memory errorMessage) private pure returns(bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
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
