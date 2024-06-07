import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class CommonService{
    constructor(private http:HttpClient, private router:Router){}
    
    otpVerificationApi='http://localhost:3000/signupOtpVerification'
    id=''
    email=''

    signupOtpVerification(data:string):Observable<any>{
        
        return this.http.post(this.otpVerificationApi,{otp:data,id:this.id})
    }

    resendOtpApi='http://localhost:3000/signupResendOtp'

    signupResendOtp():Observable<any>{
        return this.http.post(this.resendOtpApi,{id:this.id})
    }
}