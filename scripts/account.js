// include node fs module
var fs = require('fs');
var ethers = require('ethers');
var createPrivateKey = require('mnemonic-to-private-key/lib/index.js').createPrivateKey;

require("dotenv").config();
var aptos = require('aptos');

const bip39 = require('bip39')

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";
const aptosClient = new aptos.AptosClient(NODE_URL);

const provider = ethers.getDefaultProvider('https://api.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet');





//create accounts
async function batchCreateAccounts(num) {
    var accounts = '';
    for (let index = 0; index < num; index++) {
        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        const mnemonic = wallet._mnemonic().phrase;
        const privateKey = createPrivateKey(mnemonic).key;
        if (index == num - 1) {
            accounts = accounts.concat(address, '_', mnemonic, '_', privateKey);
        } else {
            accounts = accounts.concat(address, '_', mnemonic, '_', privateKey, ',', '\n');
        }
    }
    console.log('accounts: \n', accounts);

}

async function batchCreateAccountsInAptos(num) {
    var accounts = '';
    for (let index = 0; index < num; index++) {
        const mnemonic = bip39.generateMnemonic();
        console.log("mnemonic: ", mnemonic);
        const aptosAccount = aptos.AptosAccount.fromDerivePath("m/44'/637'/0'/0'/0'", mnemonic);
        const address = aptosAccount.toPrivateKeyObject().address;
        const privateKey = aptosAccount.toPrivateKeyObject().privateKeyHex;
        console.log("address : \n", address);
        console.log("privateKey : \n", privateKey);
        if (index == num - 1) {
            accounts = accounts.concat(address, '_', mnemonic, '_', privateKey);
        } else {
            accounts = accounts.concat(address, '_', mnemonic, '_', privateKey, ',', '\n');
        }
    }
    console.log('accounts: \n', accounts);
}



//batchCreateAccounts(1);

batchCreateAccountsInAptos(1);