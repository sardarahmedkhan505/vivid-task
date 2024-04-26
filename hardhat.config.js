require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {       
      hardhat: {},
      sepolia: {
          url: process.env.ALCHEMY_KEY,
          accounts: [process.env.METAMASK_KEY]
      }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  solidity: {
      version: "0.8.0",
      settings: {
          optimizer: {
              enabled: true,
              runs: 200
          }
      }
  }
};