import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,catchError,of } from 'rxjs';
import { ApiService } from '../services/api.service';

import * as $ from 'jquery';
import 'datatables.net';

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
  pastvoicedrops : any;
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
    //   {
    //           "vdRefNo" :"1236",
    //           "vdName": "ICICI",
    //           "startDate": "12-07-2023",
    //           "startTime": "11:10",
    //           "dnd": "No",
    //           "voiceFile": "Nirmala.wav",
    //           "list": "Nimmi.xls",
    //           "listSize": "100",
    //           "messageDuration": "10:20",
    //           "redialCount": "2",
    //           "clientName" : "Nirmala",
    //           "reportAvailable" : "1",
    //           "report" : "12.wav"
    //   }    
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
          console.log('Response Data :'+JSON.stringify(responseData));
          this.pastvoicedrops = responseData['voicedropInfo'];
          // console.log('vd data alone :' + responseData.voicedropInfo);
          console.log('vd data alone :' +JSON.stringify(this.pastvoicedrops));
          this.NrOfPastVoicedrops = responseData.NrofRecords;
          // this.router.navigate(['/dashboard']);
        }
        if(responseData.status === "inValid") {
          alert('Invalid Credentials');
        }
        else if (responseData.status === "Error") {
          console.log('Error Code'+responseData.error);
          alert('Error while retriving past voice drop details ');
        }
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

    this.router.navigate(['/vdcallerinfo']);
  }

}
