# Blockchain with NodeJS

This is a pratical example showing how blockchain works using NodeJs.

## Instalation

You need to have Docker and DockerCompose in your machine.

```
docker network create blockchain_nodejs_network
docker-compose up --build
```

## Key Concepts

### Blockchain

...

### Block

...

### Prof-of-Work

...

### Mining

When you use the computational power to generate `block hashes` accordingly certain difficulty 
level and increment the block's `nonce`, which will part of the block hash.

### Smart contracts

...

### Nonce

Property of a **Block** that _MUST_ change while `mining`. The `nonce` changes, so the Block **Hash** can change and we can mine it.

