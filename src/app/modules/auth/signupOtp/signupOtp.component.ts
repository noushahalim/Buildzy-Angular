import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector:'auth-signupOtp',
    templateUrl:'signupOtp.component.html'
})

export class SignupOtpComponent{

    constructor(private commonService:CommonService, private route: Router){}

    backendError:string =''
    email:string=this.commonService.email

    onOtpSubmitted(otp: any) {
        this.commonService.signupOtpVerification(otp).subscribe(
            (response)=>{
                this.commonService.id=''
                this.commonService.email=''
                this.route.navigate(['/auth/login'])
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
    }

    otpResend(){
        this.commonService.signupResendOtp().subscribe(
            (response)=>{
                console.log("success");
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
    }
}