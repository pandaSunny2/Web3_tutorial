require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

// require("./tasks/index.js")
require("./tasks")  // 同 require("./tasks/index.js")

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url:SEPOLIA_URL,
      accounts:[PRIVATE_KEY,PRIVATE_KEY_1],
      chainId: 11155111
    }
  },
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  }
};
// 0x319dD01058d4dd496D37D05E3993C153D94ffd04
// 0x3020b3165E4A436919200D8C6D280666764c0294
// 0x2240C51380ebb550aB33192490bC62e0299ce00F