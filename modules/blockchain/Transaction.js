class Transaction 
{
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    generateHash() {
        const SHA256 = require('crypto-js/sha256');

        return SHA256(
            this.fromAddress + 
            this.toAddress + 
            this.amount
        ).toString()
    }

    sign(keyPair) {
        if (keyPair.getPublic('hex') !== this.fromAddress) {
            throw new Error('Invalid public key to sign');
        }

        const hash = this.generateHash();
        const sign = keyPair.sign(hash, 'base64');

        this.signature = sign.toDER('hex');
    }

    validateSignature() {
        /**
         * If is MiningReward transaction, there is no signature.
         */
        if (this.fromAddress === null) {
            return;
        }

        if (!this.signature || this.signature.length === 0) {
            throw new Error('Invalid transaction signature');
        }

        const Keygen = require('./KeyGen');
        const keygen = new Keygen();

        if (!keygen.verify(this.fromAddress, this.generateHash(), this.signature)) {
            throw new Error('Invalid signature');
        }
    }
}

module.exports = Transaction;