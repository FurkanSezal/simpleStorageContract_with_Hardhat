const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deployinnggg...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log(`Deployed contract to: ${simpleStorage.address}`);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);
  const txResponse = await simpleStorage.store(7);
  await txResponse.wait(1);
  const uptatedValue = await simpleStorage.retrieve();
  console.log(`Uptated value is: ${uptatedValue}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function verify(contract_address, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contract_address,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
}
