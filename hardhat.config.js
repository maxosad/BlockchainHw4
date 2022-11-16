require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers")
/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      // you can add additional versions for your project
      {
        version: '0.8.9',
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/" + ALCHEMY_API_KEY
      }
    }
  }
};