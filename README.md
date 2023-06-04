# Merkle proof incrementer that allows you to choose a list of addresses to use the incrementer


## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

4. On a third terminal, start your NextJS app:

```
yarn start
```


5. Change the address array in the deploy contract file (packages/hardhat/deploy/00_deploy_your_contract.ts) and the incrementer script (packages/nextjs/pages/incrementer.tsx).

# Help Wanted!

Currently the app only works when 4 addresses are in the addresses array. The merkle proof starts to break when more addresses are added. Please help debug if you have some time.