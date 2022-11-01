const fs = require('fs').promises;

const hre = require('hardhat');

async function main() {
    try {
      const networkName = hre.network.name;
      console.log('set up latest block', networkName);
      const latestBlock = await hre.network.provider
        .send('eth_getBlockByNumber', ['latest', false]);
    //   console.log(latestBlock);
      const latestBlockFile = `.${networkName}-block-rpc-response.json`;
      await fs.writeFile(latestBlockFile, JSON.stringify(latestBlock), 'utf8');
    //   const seedPhrase = bip39.generateMnemonic();
    //   const seedPhraseFile = `.${networkName}-seed-phrase`;
    //   await fs.writeFile(seedPhraseFile, seedPhrase, 'utf8');
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  }
  
  main();
  