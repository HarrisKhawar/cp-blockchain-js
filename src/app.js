// Import SHA-1 package for encryption
const generateHash = require('sha1');

// Object constructor function that creates a Block
// @params {Number} Unique Block ID
// @params {String} Block's creation date
// @params {Object} Block's data
// previousHash is assigned automatically when adding the Block
// for Genesis Block, previousHash remains empty
function Block(id, timestamp, transactions) {
  this.id = id;
  this.timestamp = timestamp;
  this.transactions = transactions;
  this.previousHash = '';
  this.hash = this.getHash();
}

// _proto_ function that concatenates all properties of the Block
// and returns the hash generated with SHA-1
Block.prototype.getHash = function() {
  const message = this.id + this.timestamp + JSON.stringify(this.transactions) + this.previousHash;
  return generateHash(message);
}

// Object constructor function that creates a Blockchain,
// creates and adds genesis Block with the timestamp as current date
// @params {Number} ID of the Genesis Block
// @params {Object} Transactions to include in the Genesis Block
function Blockchain(genesisBlockId, genesisBlockTransactions) {
  const date = new Date();
  const currentDate = `${date.getFullYear()}` + `${date.getMonth()+1}` + `${date.getDate()}`;
  const genesisBlock = new Block(genesisBlockId, currentDate, genesisBlockTransactions);
  this.chain = [genesisBlock];
}

// _proto_ function that assigns previousHash property,
// updates the new Block's hash,
// pushes the new Block to the Blockchain
Blockchain.prototype.addBlock = function(newBlock) {
  newBlock.previousHash = this.chain[this.chain.length - 1].hash;
  newBlock.hash = newBlock.getHash();
  this.chain.push(newBlock);
}

// _proto_ function that checks if any block
// has been tampered with.
Blockchain.prototype.isAuthentic = function() {
  var currentBlock;
  var previousBlock;

  // if there is only the genesis block in the chain
  if (this.chain.length < 2) {
    currentBlock = this.chain[0];

    // compare stored hash value with current hash value
    if (currentBlock.hash !== currentBlock.getHash()) return false;
  } else {
    // if there are more than 1 blocks in the chain
    for (let i = 1; i < this.chain.length; i++) {
      currentBlock = this.chain[i];
      previousBlock = this.chain[i - 1];

      // compare stored has value with current hash value
      if (currentBlock.hash !== currentBlock.getHash()) return false;
      // check block's link in chain by comparing previous block's hash value
      // with previousHash property of the block
      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }
  }
  return true;
}

/******* TESTING ********/

// Create new blockchain
var boo = new Blockchain(0, {
  test: "Block 1"
});

//Create new block
var foo = new Block(1, 202061, {
  test: "Block 2"
});

// Add new block
boo.addBlock(foo);

// Print blockchain
console.log(boo.chain);

// Check Authenticity
console.log("Blockchain is authentic:", boo.isAuthentic());

// Tamper transactions in second block
boo.chain[1].transactions = {test: "Hacked"};
console.log("Block 2 compromised");

// Check Authenticity
console.log("Blockchain is authentic:", boo.isAuthentic());
