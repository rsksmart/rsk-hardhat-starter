const fs = require('fs');

require('solidity-coverage');
require('@nomiclabs/hardhat-waffle');

/*
Issue the following command to generate a BIP-39 seed phrase
and save it to file:

npx mnemonics@1.1.3 > .rsk-testnet-seed-phrase
*/
const rskTestnetSeedPhrase = fs.readFileSync('.rsk-testnet-seed-phrase', 'utf8').toString().trim();
if (!rskTestnetSeedPhrase
    || rskTestnetSeedPhrase.split(' ').length !== 12) {
  throw new Error('Put valid BIP-39 seed phrase in a file ".rsk-testnet-seed-phrase"');
}

/*
Issue the following command to query RSK Testnet
for its latest block, and save the response to file:

curl \
  -X POST \
  --silent \
  -H "Content-Type:application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' \
  https://public-node.testnet.rsk.co/ > .rsk-testnet-block-rpc-response.json
*/
const rskTestnetBlockRpcResponse = fs
  .readFileSync('.rsk-testnet-block-rpc-response.json')
  .toString()
  .trim();
const rskTestnetMinimumGasPrice = parseInt(
  JSON.parse(rskTestnetBlockRpcResponse).result.minimumGasPrice,
  16,
);
if (typeof rskTestnetMinimumGasPrice !== 'number'
    || isNaN(rskTestnetMinimumGasPrice)) {
  throw new Error('unable to retrieve network gas price from .rsk-testnet-block-rpc-response.json');
}
// console.log("Minimum gas price for RSK Testnet: " + rskTestnetMinimumGasPrice);

const rskTestnetGasMultiplier = 1.1;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.7',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444',
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      gasPrice: rskTestnetMinimumGasPrice,
      gasMultiplier: rskTestnetGasMultiplier,
      accounts: {
        mnemonic: rskTestnetSeedPhrase,
        // Ref: https://developers.rsk.co/rsk/architecture/account-based/#derivation-path-info
        path: "m/44'/60'/0'/0",
        // path: "m/44'/37310'/0'/0",
initialIndex: 0,
        count: 10,
      },
    },
  },
  mocha: {
    timeout: 6000000,
  },
};

/*
To verify that we're able to connect to RSK Testnet successfully:

npx hardhat console --network rsktestnet

// latest block number
(await require('hardhat').network.provider.send('eth_getBlockByNumber', ['latest', false])).minimumGasPrice

// the default EOA that will be used in deployment transactions
(await hre.ethers.getSigners())[0].address

.exit
*/
