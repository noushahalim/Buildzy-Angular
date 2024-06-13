import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, Routes } from "@angular/router";
import { loginModel } from "src/app/models/login";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector:'auth-login',
    templateUrl:'login.component.html'
})

export class loginComponent implements OnInit{

  constructor(private commonService:CommonService, private route: Router){}
    loginForm!:FormGroup
    signupButton:string='hidden'
    backendError:string=''
    
    ngOnInit() {
        this.loginForm=new FormGroup({
            email: new FormControl(null,[Validators.email,Validators.required]),
            password: new FormControl(null,Validators.required)
          });
    }

    onFormSubmited(){
    
        if (this.loginForm.valid) {
          const datas:loginModel = this.loginForm.value as loginModel
          this.commonService.login(datas).subscribe(
            (response)=>{
              localStorage.setItem('token',response.token)
              this.commonService.token=response.token
              if(response.profileImage){
                localStorage.setItem('profileImage',response.profileImage)
                this.commonService.profileImage=response.profileImage
              }
              if(response.role=='client'){
                this.route.navigate(['/'])
              }
              else if(response.role=='engineer'){
                this.route.navigate(['/engineer'])
              }
            },
            (error:any)=>{
              if(error.status==400){
                this.backendError=error.error
                setTimeout(() => {
                    this.backendError=''
                }, 3000);
              }
              else{
                  console.log(error)
              }
              }
          )
        } else {
          console.error('Form is invalid:', this.loginForm.errors);
        }
      }
      signupButtonClicked(){
        if(this.signupButton=='hidden'){
          this.signupButton='flex'
        }else{
          this.signupButton='hidden'
        }
      }
}