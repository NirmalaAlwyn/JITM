import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userAccountId : any;
  userAccountName:any;
  clientName:any;
  
  ngOnInit() {
    this.userAccountId = 10;
    this.userAccountName =  "Door Shaba Nigam Limited";
  }

  callLogout() {

  }
}
