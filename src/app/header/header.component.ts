import { Component,OnDestroy,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  // userAccountId : any;
  // userAccountName:any;
  // clientName:any;

  userAccountId = window.sessionStorage.getItem("accountId");
  userAccountName = window.sessionStorage.getItem("accountName");
  clientName = window.sessionStorage.getItem("clientName");
  clientId = window.sessionStorage.getItem("clientId");
  emailId = window.sessionStorage.getItem("emailId");

  constructor(
    public router: Router,    
  ) {

  }
  ngOnInit() {
    // comment line added
    // this.userAccountId = 10;
    // this.userAccountName =  "Door Shaba Nigam Limited";
    // this.clientName = "Nirmala Devi ";
  }

  callLogout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    // window.sessionStorage.removeItem("accountId");
    // window.sessionStorage.removeItem("accountName");
    // window.sessionStorage.removeItem("clientName");
    // window.sessionStorage.removeItem("clientId");
    // window.sessionStorage.removeItem("emailId");
    // sessionStorage.clear();
  }
}
