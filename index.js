const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Your blockchain servers is running!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    let Block = require('./modules/blockchain/Block');
    let Blockchain = require('./modules/blockchain/Blockchain');

    let blockchain = new Blockchain();

    blockchain.addBlock(1, { amount: 4 });
    blockchain.addBlock(2, { amount: 8 });
    blockchain.addBlock(3, { amount: 6 });

    /**
     * Lets check the blocks hash
     */
    console.log('\nBlock Genesis hash ' + blockchain.chain[0].hash);
    console.log('Block 1 hash ' + blockchain.chain[1].hash);
    console.log('Block 2 hash ' + blockchain.chain[2].hash);
    console.log('Block 3 hash ' + blockchain.chain[3].hash);

    /**
     * The Blockchain was not changed, so it is valid
     */
    console.log('\nIs Blockchain valid? ' + blockchain.isValid());

    /**
     * If I change the block data the blockchain becomes invalid.
     * 
     * For instance, I will update the transaction to 100!!!
     */
    blockchain.chain[1].data = { amount: 100 };
    console.log('\nBlock 1 hash updated ' + blockchain.chain[1].hash);

    console.log('\nIs Blockchain valid? ' + blockchain.isValid());
});
