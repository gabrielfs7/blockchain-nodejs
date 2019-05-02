let Block = require('./modules/blockchain/Block');
let Blockchain = require('./modules/blockchain/Blockchain');

let blockchain = new Blockchain();

blockchain.addBlock(1, { amount: 4 });
blockchain.addBlock(2, { amount: 8 });
blockchain.addBlock(3, { amount: 6 });

console.log('Blockchain is valid? ' + blockchain.isValid());