class Keygen 
{
    constructor() {
        const EC = require('elliptic').ec;
        this.ec = new EC('secp256k1');
    }

    generateKeys() {
        return this.ec.genKeyPair();
    }

    verify(fromAddress, hash, signature) {
        const publicKey = this.ec.keyFromPublic(fromAddress, 'hex');

        return publicKey.verify(hash, signature);
    }
}

module.exports = Keygen;