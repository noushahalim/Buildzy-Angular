import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class CommonService{
    constructor(private http:HttpClient, private router:Router){}
    
    id=''
    email=''

    signupOtpVerificationApi='http://localhost:3000/signupOtpVerification'

    signupOtpVerification(data:string):Observable<any>{
        
        return this.http.post(this.signupOtpVerificationApi,{otp:data,id:this.id})
    }

    signupResendOtpApi='http://localhost:3000/signupResendOtp'

    signupResendOtp():Observable<any>{
        return this.http.post(this.signupResendOtpApi,{id:this.id})
    }

    forgotPasswordApi='http://localhost:3000/forgotPassword'

    forgotPassword(data:string):Observable<any>{
        return this.http.post(this.forgotPasswordApi,data)
    }

    forgotOtpVerificationApi='http://localhost:3000/forgotOtpVerification'

    forgotOtpVerification(data:string):Observable<any>{
        return this.http.post(this.forgotOtpVerificationApi,{otp:data,id:this.id})
    }

    forgotResendOtpApi='http://localhost:3000/forgotResendOtp'

    forgotResendOtp():Observable<any>{
        return this.http.post(this.forgotResendOtpApi,{id:this.id})
    }

    changePasswordApi='http://localhost:3000/changePassword'

    changePassword(data:string):Observable<any>{
        return this.http.post(this.changePasswordApi,{password:data,id:this.id})
    }
}