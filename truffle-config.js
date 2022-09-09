var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "isolate unfair case sell bind acquire sad fence actor cotton pond fly";


module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(mnemonic,
          "https://goerli.infura.io/v3/141d722c9b834dc9a38a0bf0dd40cfe8");
      },
      network_id: 5,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.16",      // Fetch exact version from solc-bin (default: truffle's version)
     
    }
  },
};
