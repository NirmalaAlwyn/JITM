import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PastvoicedropComponent } from './pastvoicedrop/pastvoicedrop.component';
import { HeaderComponent } from './header/header.component';
import { VdcallerinfoComponent } from './vdcallerinfo/vdcallerinfo.component';
import { PlayvoiceComponent } from './playvoice/playvoice.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    PastvoicedropComponent,
    HeaderComponent,
    VdcallerinfoComponent,
    PlayvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
