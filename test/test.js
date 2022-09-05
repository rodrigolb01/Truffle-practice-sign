const VendingMachine = artifacts.require("VendingMachine");
const VerifySignature = artifacts.require("VerifySignature");

contract("VendingMachine", (accounts) =>{
    const [acc1, acc2] = accounts;
      // run constructor
    beforeEach(async () => {
        vendingMachine = await VendingMachine.new(); 
        verifySignature = await VerifySignature.new();
    });


    it('hash message', async ()=>{
        let hash = await verifySignature.getMessageHash(
            '0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C',
            123,
            "donutz",
            1);
        let signature = '0x9c9bb7c02118d9197af530d7db6577ce8b6f52200e290e0c42df9db5c966511227117c31c1c7bc420808fa1a22da241de46d7b8eccc9ce0363eb13e51fffe3511b';
        let ethHash = await verifySignature.getEthSignedMessageHash(hash);
        let signer = await verifySignature.recoverSigner(
            ethHash,
            signature);
        let verify = await verifySignature.verify(
            '0x44818e00A3E71582858425707746fb7DDFab927e',
            '0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C',
            123,
            'donutz',
            1,
            signature
        )
        console.log('original message: "donutz" ')
        console.log('message hash:' + hash);
        console.log('signer: ' + signer);
        console.log('signature is valid: ' + verify);
        
        
    });

})