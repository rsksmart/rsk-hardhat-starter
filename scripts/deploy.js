const { ethers, network } = require('hardhat');

async function deployContract(name, ...params) {
  const ContractFactory = await ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...params);
  await contract.deployed();
  console.log(
    `'${name}' was deployed on ${network.name} with address ${contract.address}`,
  );
  return contract;
}

async function main() {
  try {
    const rskStarterLogs = await deployContract('RskStarterLogs');
    await deployContract('RskStarter', rskStarterLogs.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
