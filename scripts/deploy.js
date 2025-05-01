const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const EHiringSystem = await hre.ethers.getContractFactory("EHiringSystem");

  // Deploy the contract
  const eHiringSystem = await EHiringSystem.deploy();

  // Wait until it's deployed
  await eHiringSystem.waitForDeployment();

  console.log(`EHiringSystem deployed to: ${eHiringSystem.target}`);
}

// Hardhat best practice: run the main() and catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
