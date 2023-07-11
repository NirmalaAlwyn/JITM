import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, EmailValidator } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})



export class SigninComponent implements OnInit{

  // reactiveSinginForm : FormGroup = new FormGroup({
  //   username:new FormControl(''),
  //   password:new FormControl(''),
  // });


  // constructor(
  //   public router: Router,
  //   private formBuilder: FormBuilder
  // ) {

  // }

  // ngOnInit(): void {
  //      this.reactiveSinginForm = this.formBuilder.group(
  //       {
  //         username:['',Validators.required],
  //         password:['',Validators.required],
  //       });
  // }

  reactiveSinginForm !: FormGroup;
  singInResponse: any;
  constructor(
    public router: Router,
    private apiService:ApiService,
  ) {

  }

  ngOnInit() {
    this.reactiveSinginForm = new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,Validators.required)
    });
  }

  signInRequest() {
    console.log(this.reactiveSinginForm)
    if (this.reactiveSinginForm.valid == false) {
      // this.reactiveSinginForm.get('username').markAsDirty();
      window.scroll(0, 0);
      console.log("log Invalid form data");
      return;
    }
    else {
      // this.apiService.postAPI()
      //   .subscribe(response=> {
      //     this.singInResponse = response;
      //   });
      this.router.navigate(['/dashboard']);
    }
  }
}

