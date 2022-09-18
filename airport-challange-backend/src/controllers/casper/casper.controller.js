const fs = require('fs');

// Axios 
const axios = require("axios");

// casper values
const { 
    Keys, 
    DeployUtil,
    Contracts,
    CasperClient, 
    CasperServiceByJsonRPC,
    CLKeyBytesParser,
    CLPublicKey,
    CLAccountHash,
    CLValueBuilder,
    RuntimeArgs,
    CLKey} = require('casper-js-sdk');


//*************************************** */
// The routes for the 
//*************************************** */
exports.prepareDeploy = async(req,res) => {

    // the parameter from the request
    console.log("The request in the server:")
    console.log(req.body)

    // the parameter from the request
    let metadata              = req.body.request.metadata;            // metadata for the NFT transaction
    let nftContractHash       = req.body.request.nftContractHash;     // NFT contract hash
    let erc20ContractHash     = req.body.request.erc20ContractHash;   // erc20 contract hash
    let accountHash           = req.body.request.accountHash;         // account hash of the minting account
    
    // the client to connect to
    const client = "44.240.166.110:29853";

    // rpc API
    const RPC_API = "http://138.201.54.44:7777/rpc";
    // casper client for the RPC API
    const casperClient = new CasperClient(RPC_API);

    // public key
    const pubKey = "0203396eec2bd930defcd4eefe34c2cbe194fed36aa00d727f0086ed2eedc9eaff33";

    // account hash 
    const accHash = "d3782c4b972ee677e597581d24d0ff1914b21f8613a6824d78f93e949ae94a1e";

    // set up the contracts
    const contract = new Contracts.Contract(client);

    //Build CLPublicKey from hex representation of public key
    const publicKey = CLPublicKey.fromHex(pubKey); 
    const accountHex = CLPublicKey.fromHex(pubKey).toAccountHash();

    const clKeyAccHash = new CLAccountHash(accountHex);
    console.log(clKeyAccHash);

    //Sets the contract hash of the Contract instance.
    contract.setContractHash(nftContractHash);

    // log the metadata from the frontend
    console.log(CLValueBuilder.string(metadata));
    console.log(CLValueBuilder.key(clKeyAccHash));

    // the new metadata key
    const newMetadata = JSON.stringify({
      "metadata": metadata
    });

    // prepare the arguments for the contract call
    const args = RuntimeArgs.fromMap({
        'token_owner': CLValueBuilder.key(clKeyAccHash),
        'token_meta_data': CLValueBuilder.string(newMetadata)
    });

    // call entrypoint oof the NFT contract with the metadata
    const result = contract.callEntrypoint("mint", args, publicKey,"casper-test", "1000000000", [], 10000000);
    
    // make the JSON deploy
    const deployJson = DeployUtil.deployToJson(result);

    //  get the json from the frontend and sign it with the private key
    const deployFromJson = DeployUtil.deployFromJson(deployJson);
    console.log("Deploy from Json:");
    console.log(deployFromJson.val);

    // check if the folder is present
    try {
    var folderExists = fs.existsSync("./src/pemfiles");
    console.log(folderExists);
  
      if (folderExists === true){
        // get the key pair from the private key - relative check
        var doesExist = fs.existsSync("./src/pemfiles");
    
        // content of the pem secret key
        const content = fs.readFileSync('./src/pemfiles/DeadlyDragon_secret_key.pem').toString();
        console.log(content);
    
        // get the keypair from the Private File
        const KeyPair = Keys.Secp256K1.loadKeyPairFromPrivateFile('./src/pemfiles/DeadlyDragon_secret_key.pem');
        
        // sign the deploy with the keys
        const signedDeploy = DeployUtil.signDeploy(deployFromJson.val, KeyPair);
        
        console.log("Signed deploy:");
        console.log(signedDeploy);
  
        // Here we are sending the signed deploy
        try{
        const deploy = await casperClient.putDeploy(signedDeploy);
        
        console.log('Deploy hash:');
        console.log(deploy);
        
        // return the deploy as a confirmation from the network
        res.status(200).send(deploy);
      } catch(err) {
          res.status(500).send("Deploy was unsuccessful");
        }
      }
    } catch(err) {
      console.error(err);
    }

};