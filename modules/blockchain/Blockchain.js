class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }

    generateGenesisBlock()
    {
        return new Block(
            0,
            Date.now().toLocaleString(),
            'Genesis Block',
            '0'
        );
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(index, data) {
        return new Block(
            index,
            Date.now().toLocaleString(),
            data,
            this.getLastBlock().hash
        );
    }

    isValid() {
        
    }
}