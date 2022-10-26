// include node fs module
var fs = require('fs');
var ethers = require('ethers');


const provider = ethers.getDefaultProvider('https://api.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet');
console.log("block info: ",provider.getBlockNumber().then(console.log));
console.log("wallet info:",ethers.Wallet.createRandom()._signingKey());
//create accounts
function batchCreateAccounts(){
    //await signer.
}
