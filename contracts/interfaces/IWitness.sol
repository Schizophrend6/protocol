// Neptune Mutual Protocol (https://neptunemutual.com)
// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.4.22 <0.9.0;

interface IWitness {
  event Attested(bytes32 indexed key, address indexed witness, uint256 incidentDate, uint256 stake);
  event Refuted(bytes32 indexed key, address indexed witness, uint256 incidentDate, uint256 stake);

  function attest(
    bytes32 key,
    uint256 incidentDate,
    uint256 stake
  ) external;

  function refute(
    bytes32 key,
    uint256 incidentDate,
    uint256 stake
  ) external;

  function getStatus(bytes32 key) external view returns (uint256);

  function getStakes(bytes32 key, uint256 incidentDate) external view returns (uint256, uint256);

  function getStakesOf(
    bytes32 key,
    uint256 incidentDate,
    address account
  ) external view returns (uint256, uint256);
}
