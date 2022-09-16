async function deployContract(name, ...params) {
  const ContractFactory = await hre.ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...params);
  await contract.deployed();
  console.log(
    `'${name}' was deployed on ${hre.network.name} with address ${contract.address}`,
  );
  return contract;
}

module.exports = {
  deployContract,
};
