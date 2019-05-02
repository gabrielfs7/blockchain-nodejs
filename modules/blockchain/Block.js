class Block {
    constructor(index, timestamp, data, previoudHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoudHash = previoudHash;

        let sha256 = require('crypto-js/sha256');

        this.hash = sha256(
            this.index + 
            this.previoudHash + 
            this.timestamp + 
            JSON.stringify(this.data).toString() +
            this.previoudHash
        );    
    }
}