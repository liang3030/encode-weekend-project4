import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
   }

  claimVoteTokens(body: any){
    return this.httpClient.post<any>("http://localhost:3000/claim-voting-tokens", body);
  }

  vote(body: any){
    return this.httpClient.post<any>("http://localhost:3000/vote", body); 
  }
}
