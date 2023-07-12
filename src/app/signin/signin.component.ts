import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, EmailValidator } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { catchError,Observable,of } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})



export class SigninComponent implements OnInit{

  reactiveSinginForm : FormGroup;
  singInResponse: any;
  errorMessage : any;

  signInFormData = {
    "emailId" : "",
    "pasWord" : ""
  }

  constructor(
    public router: Router,
    private apiService:ApiService,
  ) {
      this.reactiveSinginForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    });
  }

  ngOnInit() {
    
  }


  signInRequest() {
    console.log(this.reactiveSinginForm)
    if (this.reactiveSinginForm.valid == false) {
      console.log('Requires'+this.reactiveSinginForm.controls['username'].errors);
     
      if(this.reactiveSinginForm.controls['username'].hasError('required') == true)  {
        alert('Enter Registered Email Id')
        this.reactiveSinginForm.controls['username'].markAsDirty;
      }
      else if (this.reactiveSinginForm.controls['username'].hasError('email')) {
        alert('Enter Valid Email Id')
        this.reactiveSinginForm.controls['username'].markAsDirty;
      }
      else if (this.reactiveSinginForm.controls['password'].hasError('required')) {
        alert('Enter password')
        this.reactiveSinginForm.controls['password'].markAsDirty;
      }

      console.log('Name '+this.reactiveSinginForm.get('username')?.valid);
      console.log('Name '+this.reactiveSinginForm.get('username')?.value)
    
      window.scroll(0, 0);
      console.log("log Invalid form data");
      return;
    }
    else {
      this.signInFormData.emailId = this.reactiveSinginForm.get('username')?.value;
      this.signInFormData.pasWord = this.reactiveSinginForm.get('password')?.value
      console.log(this.signInFormData);
      var loginurl = "signin"
      this.apiService.postAPI(loginurl,this.signInFormData)
        .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);

        // after handling error, return a new observable 
        // that doesn't emit any values and completes
        return of();
        }))
        .subscribe( responseData => {
          this.singInResponse = responseData;

          console.log(JSON.stringify(this.singInResponse));
          console.log(this.singInResponse.loginStatus);
          if(this.singInResponse.loginStatus === "valid") {
            window.sessionStorage.setItem("accountId",this.singInResponse.accountId);
            window.sessionStorage.setItem("accountName",this.singInResponse.accountname);
            window.sessionStorage.setItem("clientId",this.singInResponse.clientId);
            window.sessionStorage.setItem("clientName",this.singInResponse.clientName);
            window.sessionStorage.setItem("emailId",this.singInResponse.emailId);

            this.router.navigate(['/dashboard']);
          }
          if(this.singInResponse.loginStatus === "inValid") {
            alert('Invalid Credentials');
          }
          else if (this.singInResponse.loginStatus === "Error") {
            console.log('Error Code'+this.singInResponse.error);
            alert('Error while Login ');
          }
        }
        );
      
    }
  }
}

