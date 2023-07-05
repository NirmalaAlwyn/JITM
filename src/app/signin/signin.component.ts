import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})



export class SigninComponent implements OnInit{
  reactiveSinginForm : FormGroup = new FormGroup({
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
  });;

  ngOnInit(): void {
      // this.reactiveSinginForm = new FormGroup({username:new FormControl(null,Validators.required)});
      // this.reactiveSinginForm = new FormGroup({password:new FormControl(null,Validators.required)});
  }

  signInRequest() {
    console.log('Sign In request')
  }
}
