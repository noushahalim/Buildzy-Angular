import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { loginModel } from "../models/login";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn:'root'
})

export class CommonService{
    constructor(private http:HttpClient, private router:Router){}
    
    api = environment.baseUrl
    token=localStorage.getItem('token')
    accessType=localStorage.getItem('accessType')
    id=''
    email=''
    profileImage=localStorage.getItem('profileImage')
    fullName=''

    signupOtpVerificationApi=`${this.api}/signupOtpVerification`

    signupOtpVerification(data:string):Observable<any>{
        
        return this.http.post(this.signupOtpVerificationApi,{otp:data,id:this.id})
    }

    signupResendOtpApi=`${this.api}/signupResendOtp`

    signupResendOtp():Observable<any>{
        return this.http.post(this.signupResendOtpApi,{id:this.id})
    }

    forgotPasswordApi=`${this.api}/forgotPassword`

    forgotPassword(data:string):Observable<any>{
        return this.http.post(this.forgotPasswordApi,data)
    }

    forgotOtpVerificationApi=`${this.api}/forgotOtpVerification`

    forgotOtpVerification(data:string):Observable<any>{
        return this.http.post(this.forgotOtpVerificationApi,{otp:data,id:this.id})
    }

    forgotResendOtpApi=`${this.api}/forgotResendOtp`

    forgotResendOtp():Observable<any>{
        return this.http.post(this.forgotResendOtpApi,{id:this.id})
    }

    changePasswordApi=`${this.api}/changePassword`

    changePassword(data:string):Observable<any>{
        return this.http.post(this.changePasswordApi,{password:data,id:this.id})
    }

    loginApi=`${this.api}/login`

    login(data:loginModel):Observable<any>{
        return this.http.post(this.loginApi,data)
    }

    changeProfileApi=`${this.api}/profileChange`

    profileChange(data:any):Observable<any>{
        return this.http.post(this.changeProfileApi,data)
    }

    profileDetailsApi=`${this.api}/profileDetails`

    profileDetails():Observable<any>{
        return this.http.get(this.profileDetailsApi)
    }

    chatSave(message:any):Observable<any>{
        const chatSaveApi=`${this.api}/chatSave`

        return this.http.post(chatSaveApi,message)
    }

    notificationCount():Observable<any>{
        const notificationCount=`${this.api}/notificationCount`

        return this.http.get(notificationCount)
    }
}