// include node fs module
var fs = require('fs');
var ethers = require('ethers');
var createPrivateKey = require('mnemonic-to-private-key/lib/index.js').createPrivateKey;

require("dotenv").config();
var aptos = require('aptos');

const bip39 = require('bip39');

var { Ed25519Keypair, mnemonicToSeed } = require('@mysten/sui.js');

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";
const aptosClient = new aptos.AptosClient(NODE_URL);

const provider = ethers.getDefaultProvider('https://api.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet');





//create accounts 
//evm accounts
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
    console.log('EVM accounts: \n', accounts);

}

//aptos accounts
async function batchCreateAccountsInAptos(num) {
    var accounts = '';
    for (let index = 0; index < num; index++) {
        const mnemonic = bip39.generateMnemonic();
        const aptosAccount = aptos.AptosAccount.fromDerivePath("m/44'/637'/0'/0'/0'", mnemonic);
        const address = aptosAccount.toPrivateKeyObject().address;
        const privateKey = aptosAccount.toPrivateKeyObject().privateKeyHex;
        if (index == num - 1) {
            accounts = accounts.concat(address, '_', mnemonic, '_', privateKey);
        } else {
            accounts = accounts.concat(address, '_', mnemonic, '_', privateKey, ',', '\n');
        }
    }
    console.log('APTOS accounts: \n', accounts);
}

//sui accounts
async function batchCreateAccountsInSui(num) {
    var accounts = '';
    for (let index = 0; index < num; index++) {
        const mnemonic = bip39.generateMnemonic();
        const keyPair = Ed25519Keypair.deriveKeypair(mnemonic);
        const address = '0x' + keyPair.getPublicKey().toSuiAddress();
        if (index == num - 1) {
            accounts = accounts.concat(address, '_', mnemonic,);
        } else {
            accounts = accounts.concat(address, '_', mnemonic, ',', '\n');
        }
    }
    console.log('SUI accounts: \n', accounts);
}





//batchCreateAccounts(1);
//batchCreateAccountsInAptos(10);
batchCreateAccountsInSui(3);