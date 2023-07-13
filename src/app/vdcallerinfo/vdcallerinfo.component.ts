import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,catchError,of } from 'rxjs';
import { ApiService } from '../services/api.service';

import * as $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-vdcallerinfo',
  templateUrl: './vdcallerinfo.component.html',
  styleUrls: ['./vdcallerinfo.component.css']
})
export class VdcallerinfoComponent {
  selectedVoiceDropRefNo = window.sessionStorage.getItem("selectedBookingRef");
  
  vdName = window.sessionStorage.getItem("voicedrop_name");
  audioURL: string | null = null;
  rrOfusers : any;
  vduserDetails : any;
  No : any;
  ActionImg : any;
  errorMessage : any;
  duration = 10;
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
    "audioFile" : ""
  }
  

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
    var url = "vdcallerdetails"
    this.apiService.postAPI(url,this.selectedBookingRefDetails)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);

      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
      }))
      .subscribe( responseData => {
        this.rrOfusers = responseData.NrofRecords;
        this.vduserDetails = responseData['voicedropCallerInfo'];
        console.log('vdcaller details :'+JSON.stringify(this.vduserDetails))
        // this.router.navigate(['/dashboard']);
      }
      ); 
  
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('#myTable1').DataTable();
    });
  }

  downloadAudioFile(item:any) {
    console.log('Download Audio file clicked')
  }

  playAudioFile(item:any) {
    console.log('Play Audio File')
    this.callerDetailsForAudioReq.vdRefNo = item.vdrefno;
    var url = "audiofile"
    this.apiService.postAPIForAudioFile(url,this.callerDetailsForAudioReq)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);

      // after handling error, return a new observable 
      // that doesn't emit any values and completes
      return of();
      }))
      .subscribe( response => {
        const audioData = response;
        const audioBlob = new Blob([audioData], { type: 'audio/wav' });
        this.audioURL = URL.createObjectURL(audioBlob);
        // const audioData = responseAudioData;
        // const audioBlob = new Blob([audioData], { type: 'audio/wav' });
        // const audioURL = URL.createObjectURL(audioBlob);

        // const audio = new Audio();
        // audio.src = audioURL;
        // audio.play();
      }
      ); 
  }

}
