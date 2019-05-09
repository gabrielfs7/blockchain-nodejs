class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 2;
        this.miningReward = 0.01;
    }

    generateGenesisBlock()
    {
        let Block = require('./Block');

        /**
         * This is the initial block in the Blockchain.
         */
        return new Block(
            0,
            Date.now().toLocaleString(),
            'Genesis Block',
            '0'
        );
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(index, data) {
        let Block = require('./Block');

        let newBlock = new Block(
            index,
            Date.now().toLocaleString(),
            data,
            this.getLastBlock().hash
        );

        newBlock.mine(this.difficulty);

        this.chain.push(newBlock);
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