let Transaction = require('./Transaction');
let Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 2;
        this.miningReward = 0.01;
        this.pendingTransactions = [];
    }

    generateGenesisBlock()
    {
        /**
         * This is the initial block in the Blockchain.
         */
        return new Block(
            Date.now().toLocaleString(),
            'Genesis Block',
            '0'
        );
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addMiningTransaction(toAddress, amount) {
        if (!toAddress || toAddress.length == 0) {
            throw new Error('Field toAddress must be provided');
        }

        let transaction = new Transaction(
            null,
            toAddress, 
            amount
        );

        this.pendingTransactions.push(transaction);
    }

    addTransaction(fromAddressKeyPair, fromAddress, toAddress, amount) {
        if (fromAddress && toAddress && (fromAddress.length == 0 || toAddress.length == 0)) {
            throw new Error('Fields fromAddess and toAddress must be provided');
        }

        if (fromAddress == toAddress) {
            throw new Error('Wallets cannot give money to themselves');
        }

        let transaction = new Transaction(fromAddress, toAddress, amount);

        transaction.sign(fromAddressKeyPair);
        transaction.validateSignature();

        this.pendingTransactions.push(transaction);
    }

    doMining(miningRewardAddress) {
        let newBlock = new Block(
            Date.now().toLocaleString(),
            this.pendingTransactions,
            this.getLastBlock().hash
        );

        newBlock.mine(this.difficulty);

        /**
         * Add transaction to pay the mining reward
         */
        this.chain.push(newBlock);
        this.pendingTransactions = [];
        this.addMiningTransaction(miningRewardAddress, this.miningReward);
    }

    /**
     * Check all the Blockchain blocks/transactions and calculate current balance of an address.
     * 
     * @param string address 
     */
    getAddressBalance(address)
    {
        let addressBalance = 0;

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                let isFromAddress = transaction.fromAddress == address;
                let isToAddress = transaction.toAddress == address;

                if (!isFromAddress && !isToAddress) {
                    continue;
                }

                if (isFromAddress) {
                    addressBalance -= transaction.amount;

                    continue;
                }
                
                if (isToAddress) {
                    addressBalance += transaction.amount;
                }
            }
        }

        return addressBalance;
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            try {
                currentBlock.validateTransactions();
            } catch (err) {

                return false;
            }

            /**
             * To guaranty the integrity of the block, we check if it was changed 
             * by comparing the stored hash with a generated one.
             */
            if (currentBlock.hash !== currentBlock.createHash()) {
                return false;                
            }

            /**
             * We also need to check if the relation with previous block is consistent
             * by comparing the hashs.
             */
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        
        return true;
    }
}

module.exports = Blockchain;