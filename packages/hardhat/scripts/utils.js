const { ethers } = require("ethers");

const getProvider = (mainnet = false) => {
    const providerURL = mainnet ? "http://10.0.0.38:8545" 
    : 'http://localhost:8545';

    return new ethers.providers.JsonRpcProvider(providerURL);
}


const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet);
    return new ethers.Wallet (
        "0xd298c396daa6b531a979c6bed1e2eab19f069d1f7b38672d6a32aaca44cc4987",
        provider
    );
};


module.exports = { getSigner, getProvider };