// Neptune Mutual Protocol (https://neptunemutual.com)
// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.4.22 <0.9.0;
import "../../interfaces/IStore.sol";
import "../../interfaces/ICover.sol";
import "../../libraries/ProtoUtilV1.sol";
import "../../libraries/StoreKeyUtil.sol";
import "../../libraries/CoverUtilV1.sol";
import "../../libraries/RegistryLibV1.sol";
import "../../libraries/ValidationLibV1.sol";
import "../../libraries/NTransferUtilV2.sol";
import "../Recoverable.sol";

/**
 * @title Base Cover Contract
 */
abstract contract CoverBase is ICover, Recoverable {
  using ProtoUtilV1 for bytes;
  using CoverUtilV1 for IStore;
  using StoreKeyUtil for IStore;

  /**
   * @dev Constructs this smart contract
   * @param store Provide the address of an eternal storage contract to use.
   * This contract must be a member of the Protocol for write access to the storage
   *
   */
  constructor(IStore store) Recoverable(store) {
    this;
  }

  /**
   * @dev Initializes this contract
   * @param liquidityToken Provide the address of the token this cover will be quoted against.
   * @param liquidityName Enter a description or ENS name of your liquidity token.
   *
   */
  function initialize(address liquidityToken, bytes32 liquidityName) external override {
    _mustBeOwnerOrProtoMember();
    require(s.getAddressByKey(ProtoUtilV1.NS_COVER_LIQUIDITY_TOKEN) == address(0), "Already initialized");

    s.setAddressByKey(ProtoUtilV1.NS_COVER_LIQUIDITY_TOKEN, liquidityToken);
    s.setBytes32ByKey(ProtoUtilV1.NS_COVER_LIQUIDITY_NAME, liquidityName);
  }

  /**
   * @dev Get more information about this cover contract
   * @param key Enter the cover key
   * @param coverOwner Returns the address of the cover creator or owner
   * @param info Gets the IPFS hash of the cover info
   * @param values Array of uint256 values
   */
  function getCover(bytes32 key)
    external
    view
    override
    returns (
      address coverOwner,
      bytes32 info,
      uint256[] memory values
    )
  {
    return s.getCoverInfo(key);
  }

  /**
   * @dev Version number of this contract
   */
  function version() external pure override returns (bytes32) {
    return "v0.1";
  }

  /**
   * @dev Name of this contract
   */
  function getName() public pure override returns (bytes32) {
    return ProtoUtilV1.CNAME_COVER;
  }
}
