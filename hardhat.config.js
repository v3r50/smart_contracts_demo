require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
    url: "http://127.0.0.1:8545",
    chainId: 2026,
    accounts: [process.env.LOCAL_PRIVKEY],
    },
  },
};
