const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Token721", function () {
//// TEST 1 ////

  it("onlyOwner: tylko owner moze mintować", async function () {
    const [owner, other] = await ethers.getSigners();

    const Token721 = await ethers.getContractFactory("Token721");
    const nft = await Token721.deploy();
    await nft.waitForDeployment();

    await expect(nft.mint(owner.address))
      .to.emit(nft, "Minted");

    await expect(
      nft.connect(other).mint(other.address)
    ).to.be.reverted;
  });

//// TEST 2 ////

  it("whenNotPaused: pause blokuje mint", async function () {
    const [owner] = await ethers.getSigners();

    const Token721 = await ethers.getContractFactory("Token721");
    const nft = await Token721.deploy();
    await nft.waitForDeployment();

    await nft.pause();

    await expect(
      nft.mint(owner.address)
    ).to.be.reverted;
  });

//// TEST 3 ////

it("burn: tylko owner moze palic tokeny", async function () {
    const [owner, other] = await ethers.getSigners();

    const Token721 = await ethers.getContractFactory("Token721");
    const nft = await Token721.deploy();
    await nft.waitForDeployment();

    await nft.mint(owner.address);

    await expect(
      nft.connect(other).burn(1)
    ).to.be.revertedWith("Not token owner");

    await nft.burn(1);

    await expect(nft.ownerOf(1)).to.be.reverted;
  });

});