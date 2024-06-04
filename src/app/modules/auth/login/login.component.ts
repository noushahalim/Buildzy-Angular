import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector:'auth-login',
    templateUrl:'login.component.html'
})

export class loginComponent implements OnInit{
    loginForm!:FormGroup
    
    ngOnInit() {
        this.loginForm=new FormGroup({
            email: new FormControl(null,[Validators.email,Validators.required]),
            password: new FormControl(null,Validators.required)
          });
    }

    onFormSubmited(){
    
        if (this.loginForm.valid) {
          alert('Form submitted successfully!');
        } else {
          console.error('Form is invalid:', this.loginForm.errors);
        }
      }
}