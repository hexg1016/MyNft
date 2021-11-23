//const API_URL = "https://eth-ropsten.alchemyapi.io/v2/Q3vixFQSOIhUYsvW3NtEKLZgptdEdgqN"
const PUBLIC_KEY="0x3ddFa508ecac6F254Afd9CC9F2c2FAB63Fd5c1cF"
PRIVATE_KEY="30e3a7d702cf470d880784a0ee7ef72b9bc02d42a4d2598a38a210dedd6f0bf7"

//const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
//const web3 = createAlchemyWeb3(API_URL)
var Web3=require('web3')
const web3 =  new Web3('http://localhost:8545')
const nftArtifact = require("../build/contracts/MyNFT.json")
const ercArtifact = require("../build/contracts/MyToken.json")

const contractAddress = "0xf288E7f6aC0026bD4Cb90dB4c9fa9573DFC2E814"
const ercAddress="0xaFa1Af0a4893e04cf7B49A291518d29CD189b507"

const ercContract = new web3.eth.Contract(ercArtifact.abi, ercAddress)
const nftContract = new web3.eth.Contract(nftArtifact.abi, contractAddress)
/*nftContract.methods.tokenURI(1).call(function(err,res){
    if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("The balance is: ", res)
})*/

async function Approve() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: ercAddress,
      nonce: nonce,
      gas: 5000000,
      data: ercContract.methods.approve(contractAddress, 1000).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log("Promise failed:", err)
      })
  }

  async function getAllowance() {
    const { allowance } =ercContract.methods;
    const balance = await allowance("0x34411ff6d804178eA0AC4E43B8Bd7576467652cE","0xf288E7f6aC0026bD4Cb90dB4c9fa9573DFC2E814").call();

    console.log("allowance: ",  balance)
  }

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 5000000,
      data: nftContract.methods.buyNFT(100, tokenURI).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
             console.log(
                "The hash of your transaction is: ",
                hash, 
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log("Promise failed:", err)
      })
  }
  //Approve()
  //mintNFT("https://gateway.pinata.cloud/ipfs/QmcmzqXfFj19VKmDR2jPu5H3o9yifez9foEfGeUVHcVJT4")
  getAllowance()
  