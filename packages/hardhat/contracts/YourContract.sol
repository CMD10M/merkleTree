//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "hardhat/console.sol";

contract Incrementer {
  bytes32 public root;
  uint256 public count;

  constructor(bytes32 _root) {
    root = _root;
  }

  function verify(address user, bytes32[] memory proof) public view returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(user));
    return MerkleProof.verify(proof, root, leaf);
  }

  function increment(address user, bytes32[] memory proof) public {
    require(verify(user, proof), "Address not allowed to use incrementer");

    count = count + 1;
  }
}


