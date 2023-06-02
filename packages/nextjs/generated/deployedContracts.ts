const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        Incrementer: {
          address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
          abi: [
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_root",
                  type: "bytes32",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "count",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "bytes32[]",
                  name: "proof",
                  type: "bytes32[]",
                },
              ],
              name: "increment",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "root",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "bytes32[]",
                  name: "proof",
                  type: "bytes32[]",
                },
              ],
              name: "verify",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
