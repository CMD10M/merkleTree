import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ContractUI } from "~~/components/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";
import { useScaffoldContractRead, useScaffoldContractWrite} from "~~/hooks/scaffold-eth";
import { BigNumber, ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'


const Home: NextPage = () => {

 
  const addresses = [
    "0xb758F0bB07eEacdCdB3c52bb02A47CA678e8Cd2a",
    "0x0fa55F7DdAF3e1B6D6e902E65A133f49fA254948",
    "0x2D143b3Ae28Fa31E7c821D138c58c32A30aA36Ae",
    "0x1c80D2A677c4a7756cf7D00fbb1c1766321333c3",
  ].map(a => ethers.utils.getAddress(a.toLowerCase()));

  const leaves = addresses.map(address =>
    Buffer.from(ethers.utils.solidityKeccak256(["address"], [address]).slice(2), "hex"),
  );
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();

  const proofs = {};
  for (let index = 0; index < addresses.length; index++) {
    const address = addresses[index];
    const leaf = leaves[index];
    const rawProof = tree.getHexProof(leaf);
    proofs[address] = rawProof;
  }

  const { address, isConnecting, isDisconnected } = useAccount()


  // const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const { writeAsync : increment } = useScaffoldContractWrite({
    contractName: "Incrementer",
    functionName: "increment",
    args: [address, proofs[address]],
  });

  const { data: count } = useScaffoldContractRead({
    contractName: "Incrementer",
    functionName: "count",
  });

  const handleIncrement = async () => {
    if (!addresses.includes(address)) {
      setError("Address not found in list");
      return;
    }
    const proof = proofs[address];
    if (proof) {
      try {
        await increment(address, proof);
      } catch (error) {
        console.error("Failed to increment:", error);
      }
    } else {
      console.error("No proof found for address:", address);
    }
  };

  const closeError = () => {
    setError("");
  };


    return ( 
      <>
   <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-10">
            <h2 className="mb-6 text-xl font-bold">{error}</h2>
            <button
              onClick={closeError}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
<div className="flex flex-col items-start w-1/2 bg-white p-10 rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Incrementer</h1>
    <label className="text-gray-600 font-medium mb-2">Connected Address:</label>
    <div className="text-gray-800 mb-6">{address}</div>
    <button
      onClick={handleIncrement}
      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
    >
      Increment
    </button>
    <div className="py-8"></div>
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">Count:</h2>
      <h2 className="text-center mt-2 text-4xl font-extrabold text-gray-900">{parseInt(count)}</h2>
    </div>
</div>
</div>
      
      </>
          );
  
    };
  

  
  export default Home;
