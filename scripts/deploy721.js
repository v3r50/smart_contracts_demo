const { ethers } = require("hardhat");

async function main() {
  const BASE_URI = ""; // ifps here

  const Token721 = await ethers.getContractFactory("Token721");
  const nft = await Token721.deploy();
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log("Token721 deployed to:", address);

  await (await nft.setBaseURI(BASE_URI)).wait();
  console.log("BaseURI set to:", BASE_URI);

  const [deployer] = await ethers.getSigners();
  await (await nft.mint(deployer.address)).wait();
  console.log("Minted tokenId #1 to:", deployer.address);

  console.log("totalSupply:", (await nft.totalSupply()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});