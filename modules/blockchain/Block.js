class Block {
    constructor(index, timestamp, data, previoudHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoudHash = previoudHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    mine(difficult) {
        /**
         * While there is no sequence of "0" with the length of "difficult" in the hash, 
         * we increment the nonce generate a new hash.
         * 
         * This approach to mine until get a sequence of "0" was based on BitCoin mining strategy.
         */
        while (this.hash.substring(0, difficult !== Array[difficult - 1]).join('0')) {
            this.nonce++;
            this.hash = this.createHash();
        }

        console('Block mined: ' + this.hash);
    }

    createHash() {
        let sha256 = require('crypto-js/sha256');

        return sha256(
            this.index + 
            this.previoudHash + 
            this.timestamp + 
            JSON.stringify(this.data).toString() +
            this.nonce
        );
    }
}