import { React, useState, useEffect } from 'react';
import '../css/Mint.css'

// import the casper service which will pass the information to the backend
import { prepareCSPRDeploy } from '../services/casper/casper.service';

// map through the parameters and show the user what will be minted
const Mint = (props) => {

  //****************************** */
  // The use effect so the initial state
  //****************************** */ 
  useEffect(() => {
    // the use effect will be calle only once on load
    // checks like signer will be performed
    const onLoad = async () => {
        console.log("Metadata in the Mint to the Contract:")
        console.log(props.metadata);
        // stringify the metadata for the call
        const stringMetadata = JSON.stringify({
            "airportFrom": props.metadata.airportFrom,  
            "airportFromDescription": props.metadata.airportFromDescription,
            "airportTo": props.metadata.airportTo,
            "airportToDescription": props.metadata.airportToDescription,
            "city": props.metadata.city, 
            "country": props.metadata.country, 
            "covidLink": props.metadata.covidLink,
            "curr": props.metadata.curr, 
            "departure": props.metadata.departure, 
            "documentLink": props.metadata.documentLink, 
            "email": props.metadata.email,        
            "firstName": props.metadata.firstName, 
            "price":props.metadata.price, 
            "return": props.metadata.return, 
            "street": props.metadata.street, 
            "surname": props.metadata.surname, 
            "type": props.metadata.type,
            "visaLink": props.metadata.visaLink,
        })
        // check if the signer is connected
        console.log(stringMetadata);
        // set the string metadata to be passed to the backend
        setStringMetadata(stringMetadata);
    }
    onLoad()
  }, [])

  // set the contracts for the NFT and ERC20 tokens
  const[nftContract,setNFTConctract] = useState("hash-84cfce2d7e6b55272725cae3aef0ae460af1a1003d6aefeb787db32a4c23e247");
  const[erc20Contract,setERC20Contract] = useState("hash-a5a32306c0abb6ffeeac1082b1b42638cea746263de15603d3c78001228bceb7");
  const[accountHash,setAccountHash] = useState("");
  const[stringMetadata,setStringMetadata] = useState("");

  return (
    <div className='mintContainer'>
        <div className='nftHashContainer'>
            <div className='contractType'>
                NFT Contract:
            </div>
            <div className='contractHash'>
                {nftContract}
            </div>
        </div>
        <div className='erc20HashContainer'>
            <div className='contractType'>
                ERC20 Contract:
            </div>
            <div className='contractHash'>
                {erc20Contract}
            </div>
        </div>

        <div className='contractMetadata'>
            <div className='contractType'>
                NFT String Metadata:
            </div>
            <div className='metadataInString'>
                {stringMetadata}
            </div>
        </div>

        <div className='mintWithMetadata'>
            <div className='mintButton'
            onClick={() => prepareCSPRDeploy(
                        stringMetadata,
                        nftContract,
                        erc20Contract,
                        accountHash,
                        )}
            >
                Mint with Metadata
            </div>
        </div>
    </div>
  )
}

export default Mint