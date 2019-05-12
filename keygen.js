/**
 * Run 'node keygen.js' to generate a key pair used to sign the Blockchain transactions
 */
const Keygen = require('./modules/blockchain/Keygen');
const keygen = new Keygen();
const keys = keygen.generateKeys();

console.log('Private key: ' + keys.getPrivate('hex'));
console.log('Public key: ' + keys.getPublic('hex'));
