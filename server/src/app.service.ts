import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers'

import {} from 'dotenv/config'

//TODO: Uncomment as soon as we have the TokenizedBallot deployed
//import * as TokenizedBallotJson from './assets/TokenizedBallot.json'  
import * as ERC20VotesJson from './assets/ERC20Votes.json'

const ERC20_CONTRACT_ADDRESS = '0x30d90e8b9add4051e134cdc2bd692b01811fccc2'  // ERC20Token from week3 project
const BALLOT_CONTRACT_ADDRESS = '0x238B26791Db1c53D764F9D44d322B0ca9056e471' // Ballot contract

export class ClaimTokens{
  address: string;
  amount: string
}

export class VoteDTO {
  proposal: string
  amount: string
}


const options = {
  alchemy: process.env.ALCHEMY_API_KEY,
  infura: process.env.INFURA_API_KEY,
}


@Injectable()
export class AppService {

  provider: ethers.providers.Provider
  wallet: ethers.Wallet
  signer: ethers.Signer
  ERC20contract: ethers.Contract;
  ballotContract: ethers.Contract
  
  
  constructor(){  
    this.provider = ethers.getDefaultProvider('goerli', options); 
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
    this.signer = this.wallet.connect(this.provider);

    this.ERC20contract = new ethers.Contract( 
      ERC20_CONTRACT_ADDRESS, 
      ERC20VotesJson.abi, 
      this.provider 
    ); 

    this.ballotContract = new ethers.Contract(
      BALLOT_CONTRACT_ADDRESS,
      TokenizedBallotJson.abi,
      this.provider,
    )
    
  }

  async claimTokens(body: ClaimTokens) {
    const signedContract = this.ERC20contract.connect(this.signer);
    console.log(`Minting ${body.amount} tokens to address: ${body.address}`);
    const mintTx = await signedContract.mint(body.address, ethers.utils.parseEther(body.amount.toString()));
    await mintTx.wait();
    return mintTx;
  }


  async vote(body: VoteDTO) {
    this.ballotContract.connect(this.signer);
    const castVoteTx = await this.ballotContract.vote(body.proposal, ethers.utils.parseEther(body.amount.toString()));
    const castVoteTxReceipt = await castVoteTx.wait();
    return castVoteTx;
  }


  async queryWinner() {
    const winningProposal = await this.ballotContract.winnerName();
    const winnerName = ethers.utils.parseBytes32String(winningProposal);
    return winnerName;
  }
  
}
