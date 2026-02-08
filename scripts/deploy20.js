const { ethers } = require("hardhat");

async function main() {
  const CAP = ethers.parseEther("10000");
  const INITIAL = ethers.parseEther("200");

  const Token20 = await ethers.getContractFactory("Token20");
  const token = await Token20.deploy(CAP, INITIAL);
  await token.waitForDeployment();

  console.log("Token20 deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});