import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,catchError,of } from 'rxjs';
import { ApiService } from '../services/api.service';

import * as $ from 'jquery';
import 'datatables.net';
export interface _pastvoicedrops {
  vdRefNo: string
  vdName: string
  startDate: string
  startTime: string
  dnd: string
  voiceFile: string
  list: string
  listSize: string
  messageDuration: string
  redialCount: string
  clientName: string
  reportAvailable: string
  report: string
}
@Component({
  selector: 'app-pastvoicedrop',
  templateUrl: './pastvoicedrop.component.html',
  styleUrls: ['./pastvoicedrop.component.css']
})

export class PastvoicedropComponent implements OnInit {
  
  userAccountId = window.sessionStorage.getItem("accountId");
  userAccountName = window.sessionStorage.getItem("accountName");
  clientName = window.sessionStorage.getItem("clientName");
  clientId = window.sessionStorage.getItem("clientId");
  emailId = window.sessionStorage.getItem("emailId");


  NrOfPastVoicedrops : any;
  pastvoicedrops: any[] = [];
  signInClientData = {
    "emailId" : window.sessionStorage.getItem("emailId"),
    "accountId" : window.sessionStorage.getItem("accountId"),
    "clientId" : window.sessionStorage.getItem("clientId"),
    "sessionId" : ""
  }
  errorMessage : any;


 
  constructor(
    public router: Router,
    private apiService:ApiService,
  ) {

  }
  

  ngOnInit(): void {
    // this.NrOfPastVoicedrops=20;    
    this.pastvoicedrops=[];
    // this.pastvoicedrops.push(
    //   {
    //     "vdRefNo" :"1234",
    //     "vdName": "ICICI",
    //     "startDate": "12-07-2023",
    //     "startTime": "11:10",
    //     "dnd": "Yes",
    //     "voiceFile": "Nirmala.wav",
    //     "list": "Nimmi.xls",
    //     "listSize": "10",
    //     "messageDuration": "10:20",
    //     "redialCount": "3",
    //     "clientName" : "Nirmala",
    //     "reportAvailable" : "0",
    //     "report" : ""
    //   },
    //   {
    //       "vdRefNo" :"1234",
    //       "vdName": "ICICI",
    //       "startDate": "12-07-2023",
    //       "startTime": "11:10",
    //       "dnd": "Yes",
    //       "voiceFile": "Nirmala.wav",
    //       "list": "Nimmi.xls",
    //       "listSize": "10",
    //       "messageDuration": "10:20",
    //       "redialCount": "3",
    //       "clientName" : "Nirmala",
    //       "reportAvailable" : "0",
    //       "report" : " "
    //   },
    //   {
    //         "vdRefNo" :"1235",
    //         "vdName": "ICICI",
    //         "startDate": "12-07-2023",
    //         "startTime": "11:10",
    //         "dnd": "Yes",
    //         "voiceFile": "Nirmala.wav",
    //         "list": "Nimmi.xls",
    //         "listSize": "10",
    //         "messageDuration": "10:20",
    //         "redialCount": "3",
    //         "clientName" : "Nirmala",
    //         "reportAvailable" : "0",
    //         "report" : ""
    //   },
      // {
      //         "vdRefNo" :"1236",
      //         "vdName": "ICICI",
      //         "startDate": "12-07-2023",
      //         "startTime": "11:10",
      //         "dnd": "No",
      //         "voiceFile": "Nirmala.wav",
      //         "list": "Nimmi.xls",
      //         "listSize": "100",
      //         "messageDuration": "10:20",
      //         "redialCount": "2",
      //         "clientName" : "Nirmala",
      //         "reportAvailable" : "1",
      //         "report" : "12.wav"
      // }    
    // ); 

    var url = "pastvoicedrops"
    this.apiService.postAPI(url,this.signInClientData)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);

      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
      }))
      .subscribe( responseData => {
        if(responseData.status === 'valid') {
          this.pastvoicedrops = responseData['voicedropInfo'];
          // this.pastvoicedrops = [responseData as _pastvoicedrops];
          // console.log('vd data alone :' + responseData.voicedropInfo);
          console.log('vd data alone :'+JSON.stringify(this.pastvoicedrops));  
          this.NrOfPastVoicedrops = responseData.NrofRecords;
          // $(document).ready(() => {
          //   $('#myTable').DataTable();
          // });
          // this.router.navigate(['/dashboard']);
        }
        if(responseData.status === "inValid") {
          alert('Invalid Credentials');
        }
        else if (responseData.status === "Error") {
          console.log('Error Code'+responseData.error);
          alert('Error while retriving past voice drop details ');
        }
          console.log('Response Data :'+JSON.stringify(responseData));
      }
      );    
  
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('#myTable').DataTable();
    });
  }
  

  downloadFile(item : any) {
    console.log(item.report);
  }

  voicedropcallerdetails(item:any) {
    console.log("Romw clicked " +item.booking_reference)
    const accountId = this.userAccountId;
    window.sessionStorage.setItem("selectedBookingRef",item.booking_reference);
    window.sessionStorage.setItem("voicedrop_name",item.voicedrop_name);

    this.router.navigate(['/vdcallerinfo']);
  }

}
