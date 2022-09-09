App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    contractInstance: false,
    msg: '0x0',
    signature: '0x0',

    init: () => {
        console.log('test!');
        return App.initWeb3();
    },

    initWeb3: async() => {
        if(typeof web3 != 'undefined')
        {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        }
        else
        {
            window.alert('please connect to Metamask');
        }
        // Modern dapp brownsers
        if(window.ethereum) {
            window.web3 = new Web3(ethereum);

            try {
                //request account if needed
                await ethereum.enable();
                //accounts now exposed
                web3.eth.sendTransaction({/* ...  */});
            } catch (error) {} 
        }
        // Legacy dapp browsers...
        else if(window.web3) {
            App.web3Provider = web3.currentProvider;
            window.web3 = new Web3(web3.currentProvider);
            // Accounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }

        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');

        }
        return App.initContracts();
    },

    initContracts: () => {
        $.getJSON("VerifySignature.json", (contract) => {
            console.log('contract', contract);
            App.contracts.VerifySignature = TruffleContract(contract);
            App.contracts.VerifySignature.setProvider(App.web3Provider);
            return App.render();
        });
    },

    render: () => {
        if (App.loading) {
            return;
        }

        App.loading = true;

        let loader = $("#loader");
        let content = $("#content");
        loader.show();
        content.hide();

        //load blockchain data
        accounts = web3.eth.accounts
        console.log(accounts);
        App.account = accounts[0];
        console.log("Your account: ", App.account);

        App.contracts.VerifySignature.deployed().then((contract) => {
            App.contractInstance = contract;
            console.log("ContractInstances:", App.contractInstance);
            console.log("Contract Address:", App.contractInstance.address);
            return true;
        }).then((val) => {
            $('account').html(App.account);
            loader.hide();
            content.show();
        });
    },

    signMessage: () => {
        $("#content").hide();
        $("#loader").show();
    
        const message = web3.sha3( $('#message').val() )
        console.log('message', message)
    
        web3.eth.sign(App.account, message, function (err, result) {
          console.log(err, result)
          $('form').trigger('reset')
          App.msg = message
          $('#msg').html('message:' + ' ' + message)
          App.signature = result
          $('#signature').html('signature:' + ' ' + result)
          $('#verify').show()
          $("#content").show();
          $("#loader").hide();
          window.alert('Message signed!')
        }) 
    },

    verify: () => {
        $("#content").hide();
        $("#loader").show();
    
        App.contractInstance.recoverSigner(App.msg, App.signature).then(function(result) {
          $('#address').html('This account signed the message:' + ' ' + result)
        }).catch((err) => {
          console.error(err);
          window.alert("There was an error recovering signature.")
        });
    
        $("#content").show();
        $("#loader").hide();
      }
};

$(() => {
    $(window).load(() => {
      App.init();
    });
  });
  