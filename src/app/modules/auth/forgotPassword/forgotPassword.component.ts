import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector:'auth-forgotPassword',
    templateUrl:'forgotPassword.component.html'
})

export class ForgotPasswordComponent implements OnInit{

    constructor(private commonService:CommonService, private route:Router){}

    backendError:string=''
    otpBackendError:string=''
    passwordBackendError:string=''

    otpSended:boolean=false
    otpVerified:boolean=false

    email:string=this.commonService.email
    
    resetPasswordForm!:FormGroup
    changePasswordForm!:FormGroup

    ngOnInit() {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl(null,[Validators.email,Validators.required])
        })
        this.changePasswordForm = new FormGroup({
            password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)])
        })
    }

    submitted = false;

    onFormSubmited(){
        
        this.submitted=true
    
        if (this.resetPasswordForm.valid) {
            this.commonService.forgotPassword(this.resetPasswordForm.value).subscribe(
                (response)=>{
                    this.commonService.id=response.id
                    this.commonService.email=response.email
                    this.email=response.email
                    this.otpSended=true
                },
                (error:any)=>{
                    if(error.status==400){
                        this.backendError=error.error
                        setTimeout(() => {
                            this.backendError=''
                        }, 3000);
                    }
                    else{
                        console.error(error.message)
                    }
                }
            )
        } else {
          console.error('Form is invalid:', this.resetPasswordForm.errors);
        }
      }
      
      onOtpSubmitted(otp: any) {
        this.commonService.forgotOtpVerification(otp).subscribe(
            (response)=>{
                this.otpVerified=true
            },
            (error:any)=>{
                if(error.status==400){
                    this.otpBackendError=error.error
                    setTimeout(() => {
                        this.otpBackendError=''
                    }, 3000);
                }
                else{
                    console.error(error.message)
                }
            }
        )
    }

    otpResend(){
        this.commonService.forgotResendOtp().subscribe(
            (response)=>{
                console.log("success");
            },
            (error:any)=>{
                if(error.status==400){
                    this.otpBackendError=error.error
                    setTimeout(() => {
                        this.otpBackendError=''
                    }, 3000);
                }
                else{
                    console.error(error.message)
                }
            }
        )
    }

    changePasswordSubmitted=false;

    onChangePasswordFormSubmited(){
        this.changePasswordSubmitted=true

        if (this.changePasswordForm.valid) {
            this.commonService.changePassword(this.changePasswordForm.value).subscribe(
                (response)=>{
                    this.commonService.id=''
                    this.commonService.email=''
                    this.otpSended=false
                    this.otpVerified=false
                    this.route.navigate(['/auth/login'])
                },
                (error:any)=>{
                    if(error.status==400){
                        this.passwordBackendError=error.error
                        setTimeout(() => {
                            this.passwordBackendError=''
                        }, 3000);
                    }
                    else{
                        console.error(error.message)
                    }
                }
            )
        } else {
          console.error('Form is invalid:', this.changePasswordForm.errors);
        }
    }
}