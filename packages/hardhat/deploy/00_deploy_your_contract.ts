import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const addresses = [
    "0x0fa55F7DdAF3e1B6D6e902E65A133f49fA254948",
    "0xDFB12e2Acf058aB415B81Da7487af4F17810bEC7",
    "0xDFB12e2Acf058aB415B81Da7487af4F17810bEC9",
  ].map(a => hre.ethers.utils.getAddress(a.toLowerCase()));

  const leaves = addresses.map(address =>
    Buffer.from(hre.ethers.utils.solidityKeccak256(["address"], [address]).slice(2), "hex"),
  );
  const tree = new MerkleTree(leaves, keccak256);
  const root = tree.getHexRoot();

  console.log(tree.toString());

  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Incrementer", {
    from: deployer,
    // Contract constructor arguments
    args: [tree.getHexRoot()],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
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

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["Incrementer"];
