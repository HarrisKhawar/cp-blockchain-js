// Import elliptic for Public Private Key Pair generation
const EC = require('elliptic').ec;
// Select secp256k1 as generation format
const ec = new EC('secp256k1');
// Import Blockchain and Transaction classes from blockchain.js
const {Blockchain, Transaction} = require('./blockchain');
// Import key from keyGenerator.js
const key = require('./keyGenerator');

/***** TESTING *****/

// Hold the key generated from keyGenerator.js
const myKey = ec.keyFromPrivate(key.privateKey);
// Hold public key as wallet address
const myWalletAddress = myKey.getPublic('hex');

// Create new Blockchain
var foo = new Blockchain();

// Create new Transaction
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
// Sign Transaction
tx1.signTransaction(myKey);
// Add transaction to pendingTransactions
foo.addTransaction(tx1);

// Start Mining
console.log('\nStart the miner...');
foo.minePendingTransactions(myWalletAddress);

// Log Balance after Mining
console.log('\nMy balance is', foo.getBalanceOfAddress(myWalletAddress));

console.log("Next Transactions");

// Create new Transaction
const tx2 = new Transaction(myWalletAddress, 'public key goes here', 10);
// Sign Transaction
tx1.signTransaction(myKey);
// Add transaction to pendingTransactions
foo.addTransaction(tx1);

// Start Mining
console.log('\nStart the miner...');
foo.minePendingTransactions(myWalletAddress);

// Log Balance after Mining
console.log('\nMy balance is', foo.getBalanceOfAddress(myWalletAddress));


// Further Testing for Checking Validity
