module.exports = {
  // default applies to all environments
  default: {
    // Blockchain node to deploy the contracts
    deployment: {
      host: "localhost", // Host of the blockchain node
      port: 8546, // Port of the blockchain node
      type: "ws" // Type of connection (ws or rpc),
      // Accounts to use instead of the default account to populate your wallet
      // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
      /*,accounts: [
        {
          privateKey: "your_private_key",
          balance: "5 ether"  // You can set the balance of the account in the dev environment
                              // Balances are in Wei, but you can specify the unit with its name
        },
        {
          privateKeyFile: "path/to/file", // Either a keystore or a list of keys, separated by , or ;
          password: "passwordForTheKeystore" // Needed to decrypt the keystore file
        },
        {
          mnemonic: "12 word mnemonic",
          addressIndex: "0", // Optional. The index to start getting the address
          numAddresses: "1", // Optional. The number of addresses to get
          hdpath: "m/44'/60'/0'/0/" // Optional. HD derivation path
        },
        {
          "nodeAccounts": true // Uses the Ethereum node's accounts
        }
      ]*/
    },
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8545"
    ],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    // dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicity specified inside the
    //            contracts section.
    //strategy: 'implicit',

    contracts: {
      EventCrowdCrowdsaleImpl: {
        deploy: true,
        track: false,
        args: {
          token: '$EventCrowdTokenImpl',
          projectEscrow: '$InstalmentPlanImpl'
        }
      }, 
      EventCrowdCrowdsale: {
        deploy: false,
        track: false
      },
      SecondRefundCrowdsale: {
        deploy: false,
        track: false
      }, 
      Crowdsale: {
        deploy: false,
        track: false
      },
      RefundEscrow: {
        deploy: false,
        track: false
      },
      Escrow: {
        deploy: false,
        track: false
      },
      IProjectEscrow: {
        deploy: false,
        track: false
      },
      Address: {
        deploy: false,
        track: false
      },
      SafeERC20: {
        deploy: false,
        track: false
      },
      InstalmentPlanImpl: {
        deploy: true,
        track: false,
        args: ['$EventCrowdTokenImpl']
      },
      InstalmentPlan: {
        deploy: false,
        track: false,
      },
      ProjectEscrow: {
        deploy: false,
        track: false,
      },
      IVotableToken: {
        deploy: false,
        track: false
      },
      DepositerRole: {
        deploy: false,
        track: false
      },
      EventCrowdTokenImpl: {
        deploy: true,
        track: false
      },
      EventCrowdToken: {
        deploy: false,
        track: false
      },
      Roles: {
        deploy: false,
        track: false
      },      
      ERC20Burnable: {
        deploy: false,
        track: false
      },
      ERC20Capped: {
        deploy: false,
        track: false
      },
      ERC20Mintable: {
        deploy: false,
        track: false
      },
      ERC20Pausable: {
        deploy: false,
        track: false
      },
      VotableToken: {
        deploy: false,
        track: false
      },
      SafeMath: {
        deploy: false,
        track: false
      },
      ERC20: {
        deploy: false,
        track: false
      }
    },
    afterDeploy: async (dependencies) => { 
      try{
        await dependencies.contracts.EventCrowdTokenImpl.methods.addMinter(dependencies.contracts.EventCrowdCrowdsaleImpl.options.address).send({from: dependencies.web3.eth.defaultAccount});
        await dependencies.contracts.InstalmentPlanImpl.methods.addDepositer(dependencies.contracts.EventCrowdCrowdsaleImpl.options.address).send({from: dependencies.web3.eth.defaultAccount});
      } catch (e) {
        console.error('Error during afterDeploy: ', e);
      }
    }
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    //dappConnection: [                 ////////// what is the rational for keeping web3 at the end here?
    //  "ws://localhost:8546",
    //  "http://localhost:8545",
    //  "$WEB3"  // uses pre existing web3 object if available (e.g in Mist)
    //]
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {
  },

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
