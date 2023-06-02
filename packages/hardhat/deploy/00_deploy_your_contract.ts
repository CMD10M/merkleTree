import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const addresses = [
    "0xb758F0bB07eEacdCdB3c52bb02A47CA678e8Cd2a",
    "0x0fa55F7DdAF3e1B6D6e902E65A133f49fA254948",
    "0x2D143b3Ae28Fa31E7c821D138c58c32A30aA36Ae",
    "0x1c80D2A677c4a7756cf7D00fbb1c1766321333c3",
  ].map(a => hre.ethers.utils.getAddress(a.toLowerCase()));

  const leaves = addresses.map(address =>
    Buffer.from(hre.ethers.utils.solidityKeccak256(["address"], [address]).slice(2), "hex"),
  );
  const tree = new MerkleTree(leaves, keccak256);
  console.log(`Leaf: ${tree.getHexLeaves()}`);
  const root = tree.getHexRoot();

  console.log(tree.toString());
 
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Incrementer", {
    from: deployer,
    args: [tree.getHexRoot()],
    log: true,
    autoMine: true,
  });

  const Incrementer = await hre.ethers.getContract("Incrementer", deployer);
  for (let index = 0; index < addresses.length; index++) {
    const address = addresses[index];
    const leaf = leaves[index];
    const proof = tree.getProof(leaf);
    const isVerified = tree.verify(proof, leaf, root);
    const isContractVerified = await Incrementer.verify(address, tree.getHexProof(leaf));

    console.log(`Address: ${address}`);
    console.log(`Leaf: ${tree.getHexLeaves()[index]}`);
    console.log();
    console.log(`Proof: ${tree.getHexProof(leaf)}`);
    console.log(`Verification: ${isVerified}`);
    console.log(`Contract verification: ${isContractVerified}`);
    console.log("-----------------------------------");
  }

};

export default deployYourContract;

deployYourContract.tags = ["Incrementer"];
