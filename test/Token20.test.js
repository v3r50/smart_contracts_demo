const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token20", function () {

  const E = (n) => ethers.parseEther(n.toString());

  let owner, alice, bob;
  let token;


  const CAP = E(10000);
  const INITIAL = E(200);   

  beforeEach(async () => {
    [owner, alice] = await ethers.getSigners();

    const Token20 = await ethers.getContractFactory("Token20");
    token = await Token20.deploy(CAP, INITIAL);
    await token.waitForDeployment();
  });


  //// TEST 1 ////

  it("deploy: ustawiawienie name, symbol, cap i mintowanie initialSupply do ownera", async () => {
    expect(await token.name()).to.equal("LexToken");
    expect(await token.symbol()).to.equal("LEX");

    expect(await token.cap()).to.equal(CAP);
    expect(await token.totalSupply()).to.equal(INITIAL);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL);

    expect(await token.owner()).to.equal(owner.address);
  });

  //// TEST 2 ////
  
  it("onlyOwner: tylko owner moze mintować, zapauzować, odpauzować", async () => {
    await expect(token.connect(alice).mint(alice.address, E(1))).to.be.reverted;
    await expect(token.connect(alice).pause()).to.be.reverted;
    await expect(token.connect(alice).unpause()).to.be.reverted;
  });

  //// TEST 3 ////

  it("cap: nie da się przekroczyć cap()", async () => {
    const remaining = CAP - INITIAL;

    await token.mint(alice.address, remaining);
    expect(await token.totalSupply()).to.equal(CAP);

    await expect(token.mint(alice.address, E(1))).to.be.reverted;
  });

});