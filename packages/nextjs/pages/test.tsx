import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ContractUI } from "~~/components/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";
import { useScaffoldContractRead, useScaffoldContractWrite} from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";


const ExampleUI: NextPage = () => {


const [count, setCount] = useState("");

useEffect(() => {
  async function getCount() {
    const { data: Currentcount } = useScaffoldContractRead({
        contractName: "Incrementer",
        functionName: "count",
      });
    setCount(Currentcount);
  }

  getCount();
}, []);


    return (
      <>
        <div>
        </div>
      </>
    );
  };
  
  export default ExampleUI;
