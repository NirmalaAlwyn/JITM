import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit{

  pastvoicedropsMenu : boolean;
  dashboadMenu : boolean;
   

  constructor(
    public router: Router,
  ) {
    this.pastvoicedropsMenu = false;
    this.dashboadMenu = false;
  }

  ngOnInit() {
    if("/dashboard" == this.router.url) {
      this.dashboadMenu = true;
    } 
    else if("/pastvoicedrop" == this.router.url) {
      this.pastvoicedropsMenu = true;
    } 
  }
}
