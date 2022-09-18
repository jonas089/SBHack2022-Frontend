import axios from 'axios';

// the URL which will be called from the frontend
const baseURL = "http://localhost:5000/api/casper/prepareDeploy";
// create the client for axios requests
const client = axios.create({
    baseURL: baseURL
  });

//******************************************* */
// prepare the axios call function for CSPR backend
//******************************************* */
const prepareCSPRDeploy = async (
  metadata, 
  nftContractHash,
  erc20ContractHash, 
  accountHash
  ) => {

    console.log(metadata);
    
    // set the body of the call
    const request = {
        metadata: metadata,
        nftContractHash: nftContractHash,
        erc20ContractHash: erc20ContractHash,
        accountHash: "0203396eec2bd930defcd4eefe34c2cbe194fed36aa00d727f0086ed2eedc9eaff33",
      };
      
      await axios({
        method: 'post',
        url: baseURL,
        data: {
          request
        }
      }).then(
        (response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        }
      );
}

export {
    prepareCSPRDeploy,
}