const EC = require('elliptic').ec;

class Keygen 
{
    constructor() {
        this.ec = new EC('secp256k1');
    }

    generateKeys() {
        return this.ec.genKeyPair();
    }

    getKeyPairFromPrivateKey(privateKey) {
        return this.ec.keyFromPrivate(privateKey);
    }

    verify(fromAddress, hash, signature) {
        const publicKey = this.ec.keyFromPublic(fromAddress, 'hex');

        return publicKey.verify(hash, signature);
    }
}

module.exports = Keygen;