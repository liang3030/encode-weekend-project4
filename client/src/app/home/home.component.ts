import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../service/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  contractAddress: string;
  winningProposal: string;

  wallet: ethers.Wallet | undefined;  
  provider: ethers.providers.BaseProvider | undefined;
  balance: string;
  tokenContractAddress: string;

  claimForm = this.fb.group({ 
    name: [''],
    id: [''],
  });

  voteForm = this.fb.group({
    proposal: [''],
    amount: [''],
  });

  constructor() {
    this.contractAddress = '0x068AB304c07AaaA12e5a54eec38DF457bCF707F4';
    this.winningProposal = 'Loading...';
  }

  ngOnInit(): void {

    this.apiService.getContractAddress().subscribe((response) => {
      this.tokenContractAddress = response.result; 
    });
    this.provider = ethers.getDefaultProvider("goerli");
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = this.wallet.address;
  }

  claimTokens(){ 
    const body = {
      name: this.claimForm.value.name, 
      id: this.claimForm.value.id
    };
    console.log(this.claimForm.value);
    this.apiService.claimVoteTokens(body).subscribe((result) => { 
      console.log(result);
    });
  }

  Vote(){ 
    const body = {
      proposal: this.claimForm.value.name, 
      amount: this.claimForm.value.id
    };
    console.log(this.claimForm.value);
    this.apiService.vote(body).subscribe((result) => { 
      console.log(result);
    });
  }
}
