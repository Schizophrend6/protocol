// Neptune Mutual Protocol (https://neptunemutual.com)
// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.4.22 <0.9.0;
import "./IMember.sol";

interface IPolicyAdmin is IMember {
  event PolicyRateSet(uint256 floor, uint256 ceiling);
  event CoverPolicyRateSet(bytes32 key, uint256 floor, uint256 ceiling);

  /**
   * @dev Sets policy rates. This feature is only accessible by owner or protocol owner.
   * @param floor The lowest cover fee rate fallback
   * @param ceiling The highest cover fee rate fallback
   */
  function setPolicyRates(uint256 floor, uint256 ceiling) external;

  /**
   * @dev Sets policy rates for the given cover key. This feature is only accessible by owner or protocol owner.
   * @param floor The lowest cover fee rate for this cover
   * @param ceiling The highest cover fee rate for this cover
   */
  function setPolicyRatesByKey(
    bytes32 key,
    uint256 floor,
    uint256 ceiling
  ) external;

  /**
   * @dev Gets the cover policy rates for the given cover key
   */
  function getPolicyRates(bytes32 key) external view returns (uint256 floor, uint256 ceiling);
}
