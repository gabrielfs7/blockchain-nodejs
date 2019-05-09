class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    mine(difficulty) {
        /**
         * While there is no sequence of "0" with the length of "difficulty" in the hash, 
         * we increment the nonce generate a new hash.
         * 
         * This approach to mine until get a sequence of "0" was based on BitCoin mining strategy.
         */
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.createHash();
        }
    }

    createHash() {
        let SHA256 = require('crypto-js/sha256');

        return SHA256(
            this.previousHash + 
            this.timestamp + 
            JSON.stringify(this.data).toString() +
            this.nonce
        ).toString();
    }
}

module.exports = Block;