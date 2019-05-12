# Blockchain with NodeJS

This is a pratical example showing how blockchain works using NodeJs.

## Instalation

You need to have Docker and DockerCompose in your machine.

```
docker network create blockchain_nodejs_network
docker-compose up --build
```

## Generate Public and Private keys

To `sign the transactions` in the Blockchain you first need to generate a key pair:

```
node keygen.js
```

## Key Concepts

### Blockchain

A `ditributed database` which stores `immutable transactions` (cannot be changed) records where the participans of the network (`miners`) can validate and process the transactions. 

The `descentralized` consensus along with transaction signatures and the fact that the blocks integrity is validated in cascaded using cryptography makes the technology very safe.

### Block

It is a `record` in your Blockchain that is only valid if followed by a previous valid block in the chain. The Block contains the data you want to save, i.e. amount, time, sender, receiver, etc.

### Address or Wallet

In order to transfer or receive money in a Blockchain network, you need to have a `wallet` or an `address`. This is basically your account. If you want to `mine` or `receive` money, you give the another user your `public key`. If you want to give money for another `address`, then you need to `sign the transaction` with your `private key`.

You can check the (TRON accounts)[https://tronscan.org/#/blockchain/accounts] as example to see wallets/addresses.

### Prof-of-Work

The Prof-of-work is what avoids the Blockchain to be `spammed` and `make difficult` for an attacker to **change a block's hash** and so for the consecutive blocks hashes (_what would make a valid chain_). For this, the Blockchain has the `Mining` mechanism.

### Mining

When you use the computational power to generate `block hashes` accordingly certain difficulty 
level and increment the block's `nonce`, which will part of the block hash.

### Mining Reward

Blockchains like `Bitcoin` are peer-to-peer networks, so mining coins to the Blockchain has a cost that is paid through `Mining Reward`, which means receive `coins` as reward for mining.

### Smart contracts

They are like contracts in the real word, but `digital`, `immutable` and stored in a blockchain.

Basically, they are `programs` that `hold the money` from wallets and transfer it to another wallet when the contract is  concluded. In case of contracts fails, it returns the money to original wallets.

You can check the [TRON contracts](https://tronscan.org/#/contracts/contracts) as example.

### Nonce

Property of a **Block** that _MUST_ change while `mining`. The `nonce` changes, so the Block **Hash** can change and we can mine it.

