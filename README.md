# `rsk-hardhat-starter`

## Get started

(1) Fork this repo on GitHub, and clone it with git

Press the "Fork" button in GitHub (top right of page).

Open a terminal:

```shell
git clone git@github.com:YOURNAME/rsk-hardhat-starter.git
```

Start in the repo:

```shell
cd rsk-hardhat-starter
npm install
```

Note that installing the dependencies can take
several minutes.

(2) Generate a seed phrase to use in RSK Testnet

```shell
npm run new-rsktestnet-seed-phrase
```

(3) Download the latest block via RPC from RSK Testnet

```shell
npm run new-rsktestnet-block
```

(4) Connect to the RSK Testnet

```shell
npm run console-rsktestnet
```

This should open up an interactive shell
in which you can interact with RSK Testnet
via Hardhat's runtime environment.

Run the following commands to:
- Obtain the latest block number.
- Obtain the address of the 1st account generated from your seed phrase.
- Exit the REPL

```js
> (await require('hardhat').network.provider.send('eth_getBlockByNumber', ['latest', false])).minimumGasPrice
'0x387ee40'

> (await hre.ethers.getSigners())[0].address
'0x9f62F68286EB1e29b2C227658672027A182a92A8'

> .exit
```

Copy the address to your clipboard,
as you will need it in the next step.

(5) Fund your account with the RSK Testnet faucet

Visit [`https://faucet.rsk.co/`](https://faucet.rsk.co/)

Paste the address that you copied earlier,
and enter the *Captcha*.

Press the "Get test tRBTC" button.

Wait for the next block to be mined,
after which you should get a "Sent" dialog.

Open the "transaction hash" link to view
the transaction in the RSK block explorer.

For example
[`0xe56bd0d23c5391d7b8771c5dac4aecb7bc9cee186a70a0ebc7c1442a720b4012`](https://explorer.testnet.rsk.co/tx/0xe56bd0d23c5391d7b8771c5dac4aecb7bc9cee186a70a0ebc7c1442a720b4012)

You can also search for your account address in the same block explorer using the account address.

For example
[0x9f62f68286eb1e29b2c227658672027a182a92a8](https://explorer.testnet.rsk.co/address/0x9f62f68286eb1e29b2c227658672027a182a92a8)

(6) Compile the smart contracts

This "empties" the results of any previous build/ compilation.

```shell
npm run clean
```

Then this uses `solc` to compile the smart contracts.

```shell
npm run compile
```

You should see the following output:

> Compiled 2 Solidity files successfully

... Now give yourself a pat on the back,
you're about halfway there!
🎉🎉🎉🎉🎉🎉

(7) Test the smart contracts

```shell
npm run test
```

(8) Deploy the smart contracts

```shell
npm run deploy-rsktestnet
```

Note that this will take some time,
usually around 2 minutes.

You should then see output that looks similar to this:

```text
'RskStarterLogs' was deployed on rsktestnet with address 0x77B37aA728d35baAd82113a2cE9758F0E9C0Abcd
'RskStarter' was deployed on rsktestnet with address 0xD26a59de92833CBa90483EcEb50c5728d5eF13Bf
```

Copy these addresses and save them somewhere,
you will need them in the next step!

(9) Verify the smart contracts

First, we'll flatten all of the solidity source files
into a single file.
This makes verification easier to perform.

```shell
npm run flatten
```

Now edit `flattened.sol`,
and delete all except for the first occurrence
of the following line:

```solidity
// SPDX-License-Identifier: GPL-3.0
```

Search for the smart contract address `RskStarterLogs`
one of the smart contracts just deployed,
in the RSK Testnet Explorer,
then click on the "Code" tab.

You should see a "Bytecode".
Press the "Verify Contract" button.
Fill in the form as follows:

| Field | Value |
|---|---|
| Contract Address | (leave default) |
| Contract name | `RskStarterLogs` |
| Source file | (upload `flattened.sol`) |
| Compiler | Select `0.8.7...` from dropdown |
| Optimization | `no` |
| EVM version | `latest` |
| Constructor Arguments | (leave empty) |
| ABI encoded arguments | `no` |
| Contract Libraries | (leave default) |

Press the "Verify" button.
You should see "Contract verification successful".

Click on "Go to contract page".
Click on the "Code" tab, which now has a check mark next to it.
You should now see:
- Contract ABI
- Contract Source
- Compilation Settings
- Bytecode

For example,
[`0x77b37aa728d35baad82113a2ce9758f0e9c0abcd`](https://explorer.testnet.rsk.co/address/0x77b37aa728d35baad82113a2ce9758f0e9c0abcd?__ctab=Code).

Now repeat the process for `RskStarterLogs`.

| Field | Value |
|---|---|
| Contract Address | (leave default) |
| Contract name | `RskStarter` |
| Source file | (upload `flattened.sol`) |
| Compiler | Select `0.8.7...` from dropdown |
| Optimization | `no` |
| EVM version | `latest` |
| Constructor Arguments | (copy the deployed address of `RskStarterLogs`) |
| ABI encoded arguments | `no` |
| Contract Libraries | (leave default) |

Note that only "Contract name" and "Constructor arguments"
are different, the rest of the fields are the same as before.

You should now be able to view the verified code tab
for this smart contract too.
For example,
[`0xd26a59de92833cba90483eceb50c5728d5ef13bf`](https://explorer.testnet.rsk.co/address/0xd26a59de92833cba90483eceb50c5728d5ef13bf?__ctab=Code).

(10) Congratulations!
You have got live smart contracts on RSK!
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉

## Next steps

Here are some ideas:

- Change the smart contracts to do something specific to what you want
- Add more tests
- Improve code coverage
- Lint code
- Self-audit for security issues
- Implement a front-end client application to talk to your DApps

## Author

[Brendan Graetz](https://bguiz.com/)

## Licence

GPL-3.0
