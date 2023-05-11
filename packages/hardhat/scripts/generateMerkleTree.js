const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const addresses = [
    "0xDFB12e2Acf058aB415B81Da7487af4F17810bEC7",
    "0x0fa55F7DdAF3e1B6D6e902E65A133f49fA254948",
    "0xDFB12e2Acf058aB415B81Da7487af4F17810bEC9",
];

const leaves = addresses.map(address => keccak256((address)))
const tree = new MerkleTree(leaves, keccak256)
const root = tree.getRoot().toString('hex')

console.log(tree.toString())

addresses.forEach((address, index) => {
    const leaf = leaves[index];
    const proof = tree.getProof(leaf);
    const isVerified = tree.verify(proof, leaf, root);

    console.log(`Address: ${address}`);
    console.log(`Leaf: ${leaf.toString('hex')}`);
    console.log();
    console.log(`Proof: ["0x${proof.map(p => p.data.toString('hex')).join('", "0x')}"]`);
    console.log(`Verification: ${isVerified}`);
    console.log('-----------------------------------');
});

console.log(`Merkle Root: 0x${root}`);

// const leaves = addresses.map(address => keccak256(Buffer.from(address.slice(2), 'hex')));
// const merkleTree = new MerkleTree(leaves, keccak256);
// const root = merkleTree.getHexRoot();


// console.log('Root:', root);

// addresses.forEach(address => {
//     const leaf = SHA256(Buffer.from(address.slice(2), 'hex'));
//     const proof = tree.getHexProof(leaf);
//     console.log(`Proof for address ${address}:`, proof);
// });