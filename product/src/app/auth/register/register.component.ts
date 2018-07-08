import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators }  from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // registration : any = {};
  showMessage : string ;
  isSuccessOrFail : boolean = false;

  registerForm : FormGroup; 

  constructor(private _authService : AuthService, private _FormBuilder : FormBuilder) { }

  ngOnInit() {
    this.registerForm  = this._FormBuilder.group({
      firstname : ["", [Validators.required, Validators.minLength(5)]],
      lastname : ["", [Validators.required, Validators.minLength(5)]],
      email : ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password : ["", [Validators.required, Validators.minLength(5)]],
      phonenumber : ["", [Validators.required, Validators.minLength(10)]]
      });
  }

  submitForm(){
    //  console.log(this.registerForm.value);
     this._authService.registration(this.registerForm.value).subscribe((data:any)=>{
      if(data)
      {
          this.isSuccessOrFail = true;
          this.showMessage = "Register sucessfull";  
          this.registerForm.reset();
      }
      else
      {
        // console.log(this.isSuccessOrFail);
          this.isSuccessOrFail = true;
          this.showMessage = "This email id already register";
      }
    });
      
  }

}
