import { Component, OnChanges,OnInit,OnDestroy ,AfterViewChecked,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable,catchError,findIndex,of } from 'rxjs';
import { ApiService } from '../services/api.service';

import * as $ from 'jquery';
import 'datatables.net';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-vdcallerinfo',
  templateUrl: './vdcallerinfo.component.html',
  styleUrls: ['./vdcallerinfo.component.css']
})
export class VdcallerinfoComponent implements OnInit ,OnDestroy {
  selectedVoiceDropRefNo = window.sessionStorage.getItem("selectedBookingRef");
  
  vdName = window.sessionStorage.getItem("voicedrop_name");
  audioURL: string | null = null;
  rrOfusers : any;
  vduserDetails : any;
  No : any;
  ActionImg : any;
  errorMessage : any;
  duration = "";
  signInClientData = {
    "maildId" : "",
    "accountId" : "",
    "clientId" : "",
    "sessionId" : ""
  }
  selectedBookingRefDetails = {
    "booking_reference" : window.sessionStorage.getItem("selectedBookingRef"),
    "accountId" : window.sessionStorage.getItem("accountId"),
    "clientId" : window.sessionStorage.getItem("clientId"),
    "sessionId" : ""
  }
  voicedropDetails = {
    "vdName" : "",
    "nrOfusers" : "",
  }

  callerDetailsForAudioReq = {
    "accountId" : window.sessionStorage.getItem("accountId"),
    "clientId" : window.sessionStorage.getItem("clientId"),
    "vdRefNo" : "",
    "sessionId" : "",
    "audioFile" : "",
    "serialNo" : 0
  }

  // vduserDetails=[
  //   {
  //     "vdrefno" : "",
  //     "calltype": 0,
  //     "phoneno": "",
  //     "connectedcustcarephone": "",
  //     "callconnectdate": "",
  //     "callstartdate": "",
  //     "callstarttime": "",
  //     "disconnectdate":"",
  //     "disconnecttime": "",
  //     "duration" : "",
  //     "audioAvailability" : 0,
  //     "audioURL" : null,

  //   }
  // ];

  dtTrigger: Subject<any> = new Subject()

  constructor(
    public router: Router,
    private apiService:ApiService,
  ) {

  }
  ngOnInit(): void {
    
    // this.rrOfusers=20;
    this.No=0;
    this.ActionImg = "";
    this.vduserDetails=[];
    // this.vduserDetails.push(
    //   {
    //     "callType" :"1234",
    //     "userPhone": "9677017716",
    //     "agentPhone": "9791017716",
    //     "status": "connected",
    //     "startDateTime": "2020-10-21",
    //     "EndDateTime": "2020-10-21",
    //     "duration": "10:20",
    //     "audioFileAvailability": "0",
    //     "audioFile": ""
        
    //   },
    //   {
    //     "callType" :"1234",
    //     "userPhone": "9677017716",
    //     "agentPhone": "9791017716",
    //     "status": "connected",
    //     "startDateTime": "2020-10-21",
    //     "EndDateTime": "2020-10-21",
    //     "duration": "10:20",
    //     "audioFileAvailability": "1",
    //     "audioFile": "nimmi.wav"       
    //   },
    //   {
    //     "callType" :"1234",
    //     "userPhone": "9677017716",
    //     "agentPhone": "9791017716",
    //     "status": "connected",
    //     "startDateTime": "2020-10-21",
    //     "EndDateTime": "2020-10-21",
    //     "duration": "10:20",
    //     "audioFileAvailability": "1",
    //     "audioFile": "nimmi.wav"        
    //   },
    //   {
    //     "callType" :"1234",
    //     "userPhone": "9677017716",
    //     "agentPhone": "9791017716",
    //     "status": "connected",
    //     "startDateTime": "2020-10-21",
    //     "EndDateTime": "2020-10-21",
    //     "duration": "10:20",
    //     "audioFileAvailability": "1",
    //     "audioFile": "nimmi.wav"        
    //   }    
    // ); 
    // console.log(this.vduserDetails)
    // var url = "vdcallerdetails"
    var url = this.apiService.apiUrl.vdcallerdetailsReq;
    this.apiService.postAPI(url,this.selectedBookingRefDetails)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);

      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
      }))
      .subscribe( responseData => {
        if(responseData.status == "Error") {
          alert(' Error while retriving voice drop details');
          //this.router.navigate(['/pastvoicedrop']);
          return;
        }

        this.rrOfusers = responseData.NrofRecords;
        if(this.rrOfusers == 0) {
          alert('No caller data available for this voice drop');
          this.router.navigate(['/pastvoicedrop']);
          return;
        }
        this.vduserDetails = responseData['voicedropCallerInfo'];
        console.log('vdcaller details :'+JSON.stringify(this.vduserDetails))
       var i = 1;
        if(this.vduserDetails.length > 0) {
          for(let index in this.vduserDetails) {
            console.log(index);
            
            console.log("connect time :"+this.vduserDetails[index].connectedcustcarephone);
            var receivedData = this.vduserDetails[index];
            receivedData.serialNo = i++;
            if(this.vduserDetails[index].connectedcustcarephone != "") {   
              receivedData.audioAvailability = 1;
              receivedData.audioURL = null;
              receivedData.duration = "";
            }
            else {
              receivedData.audioAvailability = 0;
              receivedData.audioURL = null;
            } 
            console.log("EX:"+JSON.stringify(receivedData));
            this.vduserDetails[index]= receivedData;  
          }
        }
        console.log('FINAL :'+JSON.stringify(this.vduserDetails))
        
        $(document).ready(() => {
          $('#myTable1').DataTable();
        });
        // DataTables.Api.ajax.reload(); this.vduserDetails
        // this.dtTrigger.next();
        // this.router.navigate(['/dashboard']);
      }
      ); 
  
  }

  //  ngAfterViewInit() {
  //   ngAfterViewInit() {
  //   $(document).ready(() => {
  //     $('#myTable1').DataTable();
  //   });
  // }

  // downloadAudioFile(item:any) {
  //   console.log('Download Audio file clicked')
  // }

  playAudioFile(item:any) {
    console.log('Play Audio File')
    this.callerDetailsForAudioReq.vdRefNo = item.vdrefno;
    this.callerDetailsForAudioReq.audioFile = item.phoneno
    this.callerDetailsForAudioReq.serialNo = item.serialNo;
    console.log(JSON.stringify(this.callerDetailsForAudioReq));
    // var url = "audiofile"
    var url = this.apiService.apiUrl.audiofileReq;
    this.apiService.postAPIForAudioFile(url,this.callerDetailsForAudioReq)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);
      alert('Audio File not available, Plz try again later');
      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
      }))
      .subscribe( response => {
      //   const audioData = response["data"];
      //   const audioBlob = new Blob([audioData], { type: 'audio/wav' });
      //   this.audioURL = URL.createObjectURL(audioBlob);
      //  console.log(this.audioURL)
      
      // findIndex()
        const audioData = response;
        const audioBlob = new Blob([audioData], { type: 'audio/wav' });
         this.audioURL = URL.createObjectURL(audioBlob);
         console.log(this.audioURL)
        this.vduserDetails.find((i:any) => i.serialNo == this.callerDetailsForAudioReq.serialNo).audioURL = URL.createObjectURL(audioBlob);
        console.log('End of the response')
        
        
        
        
        // const audioData = responseAudioData;
        // const audioBlob = new Blob([audioData], { type: 'audio/wav' });
        // const audioURL = URL.createObjectURL(audioBlob);

        // const audio = new Audio();
        // audio.src = audioURL;
        // audio.play();
      }
      ); 
  }

  ngOnDestroy() {
    window.sessionStorage.removeItem("selectedBookingRef");
    window.sessionStorage.removeItem("voicedrop_name");
  }
}
