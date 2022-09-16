App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    contractInstance: false,

    init: () => {
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
        $('account').html("App.account");

        App.contracts.VerifySignature.deployed().then((contract) => {
            App.contractInstance = contract;
            console.log("ContractInstances:", App.contractInstance);
            console.log("Contract Address:", App.contractInstance.address);
            return true;
        }).then((val) => {
            $('#account').html(App.account);
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
          $('#msg').html('message:' + ' ' + message)
          $('#signature').html('signature:' + ' ' + result)
          $("#content").show();
          $("#loader").hide();
          window.alert('Message signed!')
        }) 
    },

    verify: () => {
        $("#content").hide();
        $("#loader").show();
    
        const signature = $('#verifySignature').val()
        const message = $('#verifyMessage').val()
        const account = App.account; 

        try {
            if(signature.length != 132)
                throw 'invalid signature length!'
        } catch (error) {
            window.alert('invalid signature length!')
            $("#content").show();
            $("#loader").hide();
            $("#address").html('Invalid signature')
        }
       

        App.contractInstance.recoverSigner(message, signature).then(function(result) {
            console.log('recovered the signer: ' + result);
            console.log('your account is: ' + account);
            $('#address').html(result == account? 'Valid signature' : 'Invalid signature');
        }).catch((err) => {
          console.error(err);
          window.alert("An error occured while recovering signature.")
        });
    
        $("#content").show();
        $("#loader").hide();
        $("#address").html('Invalid signature')
      }
};

$(() => {
    $(window).load(() => {
      App.init();
    });
  });


  test: () => {
    const name = $('#name').val();
    const IF = $('if').val();
    const curso = $('curso').val();
    const dataIngresso = $('data_de_ingresso').val();
    const dataTermino = $('data_de_termino').val();
    const matricula = $('matricula').val();
    const cpf = $('cpf').val();
    
    const result = web3.sha3(
        {
            "Diploma": {
                "infDiploma" : {
                    "DadosDiploma": {
                        "Diplomado": {
                            "ID" : "",
                            "Nome" : "",
                            "Sexo" : "",
                            "Nacionalidade" : "",
                            "Naturalidade" : {
                                "CodigoMunicipio" : "",
                                "NomeMunicipio" : "",
                                "UF" : ""
                            },
                            "CPF" : "",
                            "RG" : {
                                "Numero" : "",
                                "UF" : ""
                            },
                            "DataDeNascimento" : ""
                        },
                        "DadosDoCurso": {
                            "NomeDoCurso" : "",
                            "CodigoCursoEMEC": "",
                            "NomeHabilitacao" : "",
                            "Modalidade" : "",
                            "TituloConferido" : "",
                            "GrauConferido" : "",
                            "EnderecoCurso" : {
                                "Logradouro" : "",
                                "Complemento" : "",
                                "Bairro" : "",
                                "CodigoMunicipio" : "",
                                "UF" : "",
                                "CEP" : ""
                            },
                            "Autorizacao" : {
                                "Tipo" : "",
                                "Numero" : "",
                                "Data" : ""
                            },
                            "Reconhecimento" : {
                                "Tipo" : "",
                                "Numero" : "",
                                "Data" : "",
                                "DataPublicacao" : ""
                            },

                        },
                        "IesEmissora": {
                            "Nome" : "",
                            "CodigoMEC" : "",
                            "CNPJ" : "",
                            "Endereco" : {
                                "Logradouro" : "",
                                "Numero" : "",
                                "Bairro" : "",
                                "CodigoMunicipio" : "",
                                "UF" : "",
                                "CEP" : ""
                            },
                            "Credenciamento" : {
                                "Tipo" : "",
                                "Numero" : "",
                                "Data" : "",
                                "DataPublicacao" : "",
                                "SecaoPublicacao" : "",
                                "PaginaPublicacao" : "",
                            },
                            "Recredenciamento" : {
                                "Tipo" : "",
                                "Numero" : "",
                                "Data" : "",
                                "DataPublicacao" : "",
                                "SecaoPublicacao " : "",
                                "PaginaPublicacao " : "",
                            },
                            "Mantedora" : {
                                "RazaoSocial" : "",
                                "CNPJ" : "",
                                "Endereco" : {
                                    "Logradouro" : "",
                                    "Numero" : "",
                                    "Bairro" : "",
                                    "CodigoMunicipal" : "",
                                    "NomeMunicipio" : "",
                                    "UF" : "",
                                    "CEP" : ""
                                }
                            },
                        },
                        "Signature" : {
                            "SignedInfo" : {
                                "CanonicalizationMethod" : {
                                    "_Algorithm" : "",
                                    "__prefix" : ""
                                },
                                "SignatureMethod" : {
                                    "_Algorithm" : "",
                                    "__prefix" : ""
                                },
                                "Reference" : [],
                                "__prefix" : ""
                                },
                            "SignatureValue" : {
                                "_Id" : "",
                                "__prefix" : "",
                                "__text" : ""
                            },
                            "KeyInfo" : {
                                "X509Data" : {
                                    "X509SubjectName" : {
                                        "__prefix" : "",
                                        "__text" : ""
                                    },
                                    "X509Certificate" : {
                                        "__prefix" : "",
                                        "__text" : ""
                                    },
                                    "__prefix" : ""
                                },
                                "__prefix" : ""
                            },
                            "Object" : {
                                "QualifyingProperties" : {
                                    "SignedProperties" : {
                                        "SignedSignatureProperties" : {

                                        }
                                    }
                                },
                                "_xmlns:ds" : "",
                                "_xmlns:xades" : "",
                                "_Id" : "",
                                "__prefix" : ""
                            }
                        },
                        "DadosRegistro" : {
                            "IesRegistradora" : {
                                "Nome" : "",
                                "CodigoMEC": "",
                                "CNPJ": ""
                            },
                            "LivroRegistro" : {
                                "LivroRegistro" : "",
                                "NumeroFolhaDoDiploma" : "",
                                "NumeroSequenciaDoDiploma": "",
                                "ProcessoDoDiploma": "",
                                "DataColacaoDeGrau": "",
                                "DataExpedicaoDiploma": "",
                                "DataRegistroDiploma": "",
                                "ResponsavelRegistro": {
                                    "Nome" : "",
                                    "CPF" : "",
                                    "IDouNumeroMatricula" : ""
                                }
                            },
                            "IdDocumentacaoAcademica" : "",
                            "Seguranca" : {
                                "CodigoValidacao" : ""
                            },
                            "Signature" : {

                            },
                            "_id" : "",
                            "_versao" : ""
                        }
                    }
                },
                "Signature" : { },
                "_xmlns": "",
                "_xmlns:ns2" : "",
            }
        }
    );
    $("#content").show();
    $("#loader").hide();
    $("#hashDados").html('hash dos dados' + ' ' + result);
}
  