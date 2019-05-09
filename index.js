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

    let Blockchain = require('./modules/blockchain/Blockchain');

    let blockchain = new Blockchain();

    blockchain.addTransaction(null, 'user1', 100.00 );
    blockchain.addTransaction('user1', 'user2', 50.00 );
    blockchain.addTransaction('user1', 'user3', 40.00 );
    blockchain.doMining('user3');

    /**
     * Now user3 will receive a Mining Reward
     */
    blockchain.doMining('user1');

    console.log('\nCheck balance after mining reward:\n');
    console.log(' - Balance user1 ' + blockchain.getAddressBalance('user1'));
    console.log(' - Balance user2 ' + blockchain.getAddressBalance('user2'));
    console.log(' - Balance user3 (0.01 as reward): ' + blockchain.getAddressBalance('user3'));

    /**
     * The Blockchain was not changed, so it is valid
     */
    console.log('\nTrying to hack the Blockchain:\n');
    console.log(' - Is Blockchain valid? ' + blockchain.isValid());

    /**
     * If I change the block data the blockchain becomes invalid.
     * 
     * For instance, I will update the transaction amount to 1000!!!
     */
    blockchain.chain[1].transactions[0].amount = 1000;

    console.log(' - Is Blockchain valid? ' + blockchain.isValid());
});
