require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      }
    ]
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    localhost: {
      allowUnlimitedContractSize: true
    }
  }
};
