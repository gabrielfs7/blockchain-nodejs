const http = require('http');
const hostname = '127.0.0.1';
const port = '3000';
const server = http.createServer((req, res) => {
    let Block = require('./modules/blockchain/Block');
    let Blockchain = require('./modules/blockchain/Blockchain');
    
    let blockchain = new Blockchain();
    
    blockchain.addBlock(1, { amount: 4 });
    blockchain.addBlock(2, { amount: 8 });
    blockchain.addBlock(3, { amount: 6 });
    
    let content = 'Blockchain is valid? ' + blockchain.isValid();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(content);
});

server.listen(hostname, port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});