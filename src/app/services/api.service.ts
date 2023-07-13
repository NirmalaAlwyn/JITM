import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient ) 
  { }
  
  postAPI(requrl:any,inputData:any) : Observable<any> {
    const baseurl = 'http://localhost:3000/';
    const headers = { 'Content-Type': 'application/json', 'My-Custom-Header': 'foobar'};
    const url = baseurl + requrl;
    console.log('url' +url);
    console.log('inputData' + JSON.stringify(inputData));
    return this.httpClient.post(url,inputData,{headers});
  }

  postAPIForAudioFile(requrl:any,inputData:any) : Observable<any> {
    const baseurl = 'http://localhost:3000/';
    const url = baseurl + requrl;
    console.log('url' +url);
    console.log('inputData' + JSON.stringify(inputData));
    return this.httpClient.post(url,inputData,{ responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'audio/wav' }) })
  }
}
