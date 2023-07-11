import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';

// import { DataTableDirective } from 'angular-datatables';
//import { Subject } from 'rxjs';

// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-responsive';

//declare var $: any;

@Component({
  selector: 'app-pastvoicedrop',
  templateUrl: './pastvoicedrop.component.html',
  styleUrls: ['./pastvoicedrop.component.css']
})
export class PastvoicedropComponent implements OnInit {
  
  NrOfPastVoicedrops : any;
  pastvoicedrops : any;
 
  constructor(
    public router: Router,
  ) {

  }
  

  ngOnInit(): void {
    this.NrOfPastVoicedrops=20;    
    this.pastvoicedrops=[];
    this.pastvoicedrops.push(
      {
        "vdRefNo" :"1234",
        "vdName": "ICICI",
        "startDate": "12-07-2023",
        "startTime": "11:10",
        "dnd": "Yes",
        "voiceFile": "Nirmala.wav",
        "list": "Nimmi.xls",
        "listSize": "10",
        "messageDuration": "10:20",
        "redialCount": "3",
        "clientName" : "Nirmala",
        "reportAvailable" : "0",
        "report" : ""
      },
      {
          "vdRefNo" :"1234",
          "vdName": "ICICI",
          "startDate": "12-07-2023",
          "startTime": "11:10",
          "dnd": "Yes",
          "voiceFile": "Nirmala.wav",
          "list": "Nimmi.xls",
          "listSize": "10",
          "messageDuration": "10:20",
          "redialCount": "3",
          "clientName" : "Nirmala",
          "reportAvailable" : "0",
          "report" : " "
      },
      {
            "vdRefNo" :"1235",
            "vdName": "ICICI",
            "startDate": "12-07-2023",
            "startTime": "11:10",
            "dnd": "Yes",
            "voiceFile": "Nirmala.wav",
            "list": "Nimmi.xls",
            "listSize": "10",
            "messageDuration": "10:20",
            "redialCount": "3",
            "clientName" : "Nirmala",
            "reportAvailable" : "0",
            "report" : ""
      },
      {
              "vdRefNo" :"1236",
              "vdName": "ICICI",
              "startDate": "12-07-2023",
              "startTime": "11:10",
              "dnd": "No",
              "voiceFile": "Nirmala.wav",
              "list": "Nimmi.xls",
              "listSize": "100",
              "messageDuration": "10:20",
              "redialCount": "2",
              "clientName" : "Nirmala",
              "reportAvailable" : "1",
              "report" : "12.wav"
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
    console.log("Romw clicked " +item.vdRefNo)
    this.router.navigate(['/vdcallerinfo']);
  }

}
