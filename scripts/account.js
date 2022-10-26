// include node fs module
var fs = require('fs');
var ethers = require('ethers');


const provider = ethers.getDefaultProvider('https://api.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet');


//create accounts
async function batchCreateAccounts(num) {
    var accounts = '';
    for (let index = 0; index < num; index++) {
        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        const mnemonic = wallet._mnemonic().phrase;
        if (index == num - 1) {
            accounts = accounts.concat(address, '_', mnemonic);
        } else {
            accounts = accounts.concat(address, '_', mnemonic,',' ,'\n');
        }
    }
    console.log('accounts: \n', accounts);

}



batchCreateAccounts(4);