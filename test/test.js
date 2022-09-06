const VerifySignature = artifacts.require("VerifySignature");

contract("VerifySignature", (accounts) =>{
    const [acc1, acc2] = accounts;
      // run constructor
    beforeEach(async () => {
        verifySignature = await VerifySignature.new();
    });


    it('hash message', async ()=>{
        let msg = "donutz";
        let recipientAddress = '0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C';
        let signerAddress = '0x44818e00A3E71582858425707746fb7DDFab927e';
        let hash = await verifySignature.getMessageHash(
            recipientAddress,
            123,
            msg,
            1);
        let signature = '0x9c9bb7c02118d9197af530d7db6577ce8b6f52200e290e0c42df9db5c966511227117c31c1c7bc420808fa1a22da241de46d7b8eccc9ce0363eb13e51fffe3511b';
        let ethHash = await verifySignature.getEthSignedMessageHash(hash);
        let signer = await verifySignature.recoverSigner(
            ethHash,
            signature);
        let verify = await verifySignature.verify(
            signerAddress,
            recipientAddress,
            123,
            msg,
            1,
            signature
        )
        console.log('original message: ' + msg);
        console.log('message hash:' + hash);
        console.log('personal signature is: ' + signature);
        console.log('ethereum signature is: ' + ethHash);
        console.log('signer: ' + signer);
        console.log('signature is valid: ' + verify);
    });
})