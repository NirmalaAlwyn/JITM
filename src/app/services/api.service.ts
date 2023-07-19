import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient ) 
  { 

  }

  // baseurl = 'http://localhost:3000/';
  baseurl = environment.backendIp + environment.backendPort + "/";
  
  apiUrl = {
    "signinReq" : this.baseurl + "signin",
    "pastvoicedropsReq" : this.baseurl + "pastvoicedrops",
    "vdcallerdetailsReq" : this.baseurl + "vdcallerdetails",
    "audiofileReq" : this.baseurl + "audiofile",
    "filedownloadReq" : this.baseurl + "filedownload",
  }



  
  postAPI(url:any,inputData:any) : Observable<any> {
    // const baseurl = 'http://localhost:3000/';
    const headers = { 'Content-Type': 'application/json', 'My-Custom-Header': 'foobar'};
    // const url = this.baseurl + requrl;
    console.log('url' +url);
    console.log('inputData' + JSON.stringify(inputData));
    return this.httpClient.post(url,inputData,{headers});
  }

  postAPIForAudioFile(url:any,inputData:any) : Observable<any> {
    // const baseurl = 'http://localhost:3000/';
    // const headers = { 'Content-Type': 'audio/wav',responseType: 'arraybuffer' };
    // const url = this.baseurl + requrl;
    console.log('url' +url);
    console.log('inputData' + JSON.stringify(inputData));
    // return this.httpClient.post(url,inputData,{headers});
    //Working
    // return this.httpClient.post(url,inputData,{ responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'audio/wav' }) })

    return this.httpClient.post(url,inputData,{ responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postAPIforFileDownload(url:any,inputData:any) : Observable<any> {
    const baseurl = 'http://localhost:3000/';
    // const headers = { 'Content-Type': 'application/x-www-form-urlencoded',responseType: 'blob' };
    // const url = baseurl + requrl;
    console.log('url' +url);
    console.log('inputData' + JSON.stringify(inputData));
    return this.httpClient.post(url,inputData,{ responseType: 'blob', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }

}
  
