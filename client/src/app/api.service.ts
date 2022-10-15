import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
   }

  helloWorld(){
    return this.httpClient.get<string>('/api/hello_world');

  }
}
