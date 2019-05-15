const Blockchain = require('./backend/modules/blockchain/Blockchain');
const Keygen = require('./backend/modules/blockchain/Keygen');
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

    let keygen = new Keygen();

    /**
     * Define user wallet keys
     */
    let user1PrivateKey = 'eeb3c40bab45fefe3b1fff1ddffff9fa991f135de0751551f49b11b2429985cc';
    let user1PublicKey = '04b20e4f0340cfd8a8463e792f62022ef1b777169f93a3bacb279f2cea0db4a9188d212da8418d9ef61cba875352bc277359fdbc2ab24d019ac62262dd2114afeb';
    let user1KeyPair = keygen.getKeyPairFromPrivateKey(user1PrivateKey);

    let user2PrivateKey = '7a6d5162e4f1bfe1ef89cd4a23401380c84627cd0088fd8734b62d75f4c19ddf';
    let user2PublicKey = '04e1d39fd7c6abc1e694c38a8804aa3f39623f0b835e4abf2e25af0fe78b69f60b0c36ff878c6431b3b924d72e9bd8efc8edc68315a926b5f1f61fa32ac56b9a06';
    let user2KeyPair = keygen.getKeyPairFromPrivateKey(user2PrivateKey);

    let user3PrivateKey = 'a4c4f662853530db29b4d7ab085cd794221d22c7ac1be93160e6e609fe853cef';
    let user3PublicKey = '045b5c015b3d35758e8d2a24ca5fe7ed93fedbe9641221124b65cb2f20882363e103780504641127f84e9eba8ef95f46ac132366659dd1dc4575642f4eb3766327';
    let user3KeyPair = keygen.getKeyPairFromPrivateKey(user3PrivateKey);

    let blockchain = new Blockchain();

    /**
     * We set user3 to mining the transactions
     */
    blockchain.addMiningTransaction(user1PublicKey, 100.00 );
    blockchain.addTransaction(user1KeyPair, user2PublicKey, 50.00 );
    blockchain.addTransaction(user1KeyPair, user3PublicKey, 40.00 );
    blockchain.doMining(user3PublicKey);

    blockchain.addTransaction(user2KeyPair, user3PublicKey, 20.00 );
    blockchain.addTransaction(user3KeyPair, user1PublicKey, 10.00 );
    blockchain.doMining(user3PublicKey);

    /**
     * Now user3 receives all pendings Mining Rewards
     */
    blockchain.doMining(user3PublicKey);

    console.log('\nCheck balance after mining reward:\n');
    console.log(' - Balance user1 ' + blockchain.getAddressBalance(user1PublicKey));
    console.log(' - Balance user2 ' + blockchain.getAddressBalance(user2PublicKey));
    console.log(' - Balance user3 ' + blockchain.getAddressBalance(user3PublicKey));

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
