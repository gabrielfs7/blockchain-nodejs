class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 2;
        this.miningReward = 0.01;
        this.pendingTransactions = [];
    }

    generateGenesisBlock()
    {
        let Block = require('./Block');

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

    addTransaction(fromAddress, toAddress, amount) {
        let Transaction = require('./Transaction');

        this.pendingTransactions.push(
            new Transaction(
                fromAddress, 
                toAddress, 
                amount
            )
        );
    }

    doMining(miningRewardAddress) {
        let Block = require('./Block');

        let newBlock = new Block(
            Date.now().toLocaleString(),
            this.pendingTransactions,
            this.getLastBlock().hash
        );

        newBlock.mine(this.difficulty);

        this.chain.push(newBlock);

        /**
         * Add transaction to pay the mining reward
         */
        this.pendingTransactions = [];
        this.addTransaction(
            null, 
            miningRewardAddress, 
            this.miningReward
        );
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