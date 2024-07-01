import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { loginModel } from "src/app/models/login";
import { CommonService } from "src/app/services/common.service";
import { EngineerService } from "src/app/services/engineer.service";

@Component({
    selector:'auth-login',
    templateUrl:'login.component.html'
})

export class loginComponent implements OnInit{

  constructor(private commonService:CommonService, private engineerService:EngineerService , private route: Router){}
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
              if(response.profileImage){
                localStorage.setItem('profileImage',response.profileImage)
                this.commonService.profileImage=response.profileImage
              }
              if(response.role=='client'){
                localStorage.setItem('token',response.token)
                localStorage.setItem('accessType',response.role)
                this.commonService.token=response.token
                this.commonService.accessType=response.role
                this.route.navigate(['/'])
              }
              else if(response.role=='engineer'){
                if(response.registered==true){
                  localStorage.setItem('token',response.token)
                  localStorage.setItem('accessType',response.role)
                  this.commonService.token=response.token
                  this.commonService.accessType=response.role
                  this.route.navigate(['/engineer'])
                }
                else{
                  this.engineerService.id= response.id
                  this.route.navigate(['/engineer/companyRegistration'])
                }
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