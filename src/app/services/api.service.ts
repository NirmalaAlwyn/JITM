import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient ) { }

  //private url = "";

  //header : HttpHeaders{}
  postAPI() {}

  // postAPI(url:string,Data:Object) {
  //   return this.httpClient.post(url,header,data);
  // }
}
