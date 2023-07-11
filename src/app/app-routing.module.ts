import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PastvoicedropComponent } from './pastvoicedrop/pastvoicedrop.component';
import { VdcallerinfoComponent } from './vdcallerinfo/vdcallerinfo.component';
import { HeaderComponent } from './header/header.component';
import { PlayvoiceComponent } from './playvoice/playvoice.component'

const routes: Routes = [
  { path : '' , component:SigninComponent },
  { path : 'login', component:SigninComponent },
  { path : 'dashboard', component:DashboardComponent },
  { path : 'pastvoicedrop', component:PastvoicedropComponent },
  { path : 'vdcallerinfo', component:VdcallerinfoComponent} ,
  { path : 'header', component:HeaderComponent},
  { path : 'play', component:PlayvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
