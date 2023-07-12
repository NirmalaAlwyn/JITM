import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  // userAccountId : any;
  // userAccountName:any;
  // clientName:any;

  userAccountId = window.sessionStorage.getItem("accountId");
  userAccountName = window.sessionStorage.getItem("accountName");
  clientName = window.sessionStorage.getItem("clientName");
  clientId = window.sessionStorage.getItem("clientId");
  emailId = window.sessionStorage.getItem("emailId");

  ngOnInit() {
    // this.userAccountId = 10;
    // this.userAccountName =  "Door Shaba Nigam Limited";
    // this.clientName = "Nirmala Devi ";
  }

  callLogout() {

  }
}
