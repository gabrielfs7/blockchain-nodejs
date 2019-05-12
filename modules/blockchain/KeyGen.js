class Keygen 
{
    constructor()
    {
        const EC = require('elliptic').ec;
        this.ec = new EC('secp256k1');
    }

    generateKeys() {
        return this.ec.genKeyPair();
    }
}

module.exports = Keygen;