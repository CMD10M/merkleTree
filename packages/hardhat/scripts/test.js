const { ethers } = require("ethers");
const { getProvider, getSigner } = require("./utils.js");
const { ABI } = require("./abi.js");

const contractAddress = "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49";
const Signer = getSigner();

const randomContract = new ethers.Contract(
  contractAddress,
  ABI,
  Signer
);

async function main() {
  const result = await randomContract.verify(
    "0x0fa55F7DdAF3e1B6D6e902E65A133f49fA254948",
    [
      "0xcb89dca81fbe8a09817bb0b221c6ffe44f146adb362f6fbeca430ea208c8fd5e",
      "0xde8b69a58e54fc409ff80797e7ab156cf008b3f9566792513344b75856331c26"
    ]
  );

  console.log("Verification result", result);
}

main().catch((error) => {
  console.error("Error:", error);
});
