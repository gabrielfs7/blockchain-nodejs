class Transaction 
{
    constructor(fromAddress, toAddress, amount)
    {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    sign(keyPair) {
        if (keyPair.getPublic('hex') !== this.fromAddress) {
            throw new Error('Invalid public key to sign');
        }

        const SHA256 = require('crypto-js/sha256');
        const hash = SHA256(
            this.fromAddress + 
            this.toAddress + 
            this.amount
        ).toString()
        const sign = keyPair.sign(hash, 'base64');

        this.signature = sign.toDER('hex');
    }

    validateSignature() {
        if (this.fromAddress === null) {
            return;
        }

        if (!this.signature || this.signature.length === 0) {
            throw new Error('Invalid transaction signature');
        }
    }
}

module.exports = Transaction;