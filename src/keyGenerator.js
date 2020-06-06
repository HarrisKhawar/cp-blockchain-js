const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Generate Public Private Key Pair
const key = ec.genKeyPair();

// Hold Public Key
const publicKey = key.getPublic('hex');

// Hold Private Key
const privateKey = key.getPrivate('hex');

// Export Private Key
module.exports.privateKey = privateKey;
