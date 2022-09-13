const { expect } = require('chai');
const { deployContract } = require('../util');

describe('RskStarter', () => {
  let rskStarterLogs;
  let rskStarter;

  before(async () => {
    rskStarterLogs = await deployContract('RskStarterLogs');
    rskStarter = await deployContract('RskStarter', rskStarterLogs.address);
  });

  describe('Upon deployment', () => {
    it('deployed smart contracts should have valid addresses', async () => {
      expect(rskStarterLogs.address).to.be.properAddress;
      expect(rskStarter.address).to.be.properAddress;
    });

    it('logger counter should be set to zero', async () => {
      expect(await rskStarterLogs.count()).to.equal(0);
    });
  });

  describe('Logging the RskStarter function calls', () => {
    it('should log the speak() function call', async () => {
      const source = rskStarter.address;
      const isLoud = false;
      const text = 'Our purpose is to build a more decentralized world';

      await expect(rskStarter.speak(text))
        .to.emit(rskStarterLogs, 'RskStarterLog')
        .withArgs(source, isLoud, text);
    });

    it('should increment the logger counter after the logging', async () => {
      expect(await rskStarterLogs.count()).to.equal(1);
    });

    it('should log the shout() function call', async () => {
      const source = rskStarter.address;
      const isLoud = true;
      const text = 'Our vision is a safe and equitable global financial system';

      await expect(rskStarter.shout(text))
        .to.emit(rskStarterLogs, 'RskStarterLog')
        .withArgs(source, isLoud, text);
    });

    it('should increment the logger counter after the logging', async () => {
      expect(await rskStarterLogs.count()).to.equal(2);
    });
  });
});
