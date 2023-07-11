import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-vdcallerinfo',
  templateUrl: './vdcallerinfo.component.html',
  styleUrls: ['./vdcallerinfo.component.css']
})
export class VdcallerinfoComponent {
  vdName : any;
  rrOfusers : any;
  vduserDetails : any;
  No : any;
  ActionImg : any;
 
  constructor(
    public router: Router,
  ) {

  }
  ngOnInit(): void {
    this.vdName = "SkyLink";
    this.rrOfusers=20;
    this.No=0;
    this.ActionImg = "";
    this.vduserDetails=[];
    this.vduserDetails.push(
      {
        "callType" :"1234",
        "userPhone": "9677017716",
        "agentPhone": "9791017716",
        "status": "connected",
        "startDateTime": "2020-10-21",
        "EndDateTime": "2020-10-21",
        "duration": "10:20",
        "audioFileAvailability": "1",
        "audioFile": "nimmi.wav"
        
      },
      {
        "callType" :"1234",
        "userPhone": "9677017716",
        "agentPhone": "9791017716",
        "status": "connected",
        "startDateTime": "2020-10-21",
        "EndDateTime": "2020-10-21",
        "duration": "10:20",
        "audioFileAvailability": "1",
        "audioFile": "nimmi.wav"       
      },
      {
        "callType" :"1234",
        "userPhone": "9677017716",
        "agentPhone": "9791017716",
        "status": "connected",
        "startDateTime": "2020-10-21",
        "EndDateTime": "2020-10-21",
        "duration": "10:20",
        "audioFileAvailability": "1",
        "audioFile": "nimmi.wav"        
      },
      {
        "callType" :"1234",
        "userPhone": "9677017716",
        "agentPhone": "9791017716",
        "status": "connected",
        "startDateTime": "2020-10-21",
        "EndDateTime": "2020-10-21",
        "duration": "10:20",
        "audioFileAvailability": "1",
        "audioFile": "nimmi.wav"        
      }    
    ); 

  
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('#myTable1').DataTable();
    });
  }

}
