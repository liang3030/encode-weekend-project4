import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contractAddress: string;
  winningProposal: string;

  constructor() {
    this.contractAddress = '0x068AB304c07AaaA12e5a54eec38DF457bCF707F4';
    this.winningProposal = 'Loading...';
  }

  ngOnInit(): void {}
}
