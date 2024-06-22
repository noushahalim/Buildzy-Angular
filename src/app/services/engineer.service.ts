import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "../models/signup";
import { Observable } from "rxjs";
import { componyRegistration } from "../models/componyRegistration";

@Injectable({
    providedIn:'root'
})

export class EngineerService{
    constructor(private http:HttpClient, private router:Router){}

    componyData:any=''
    componyRegistrationStatus:boolean=false
    id:string=''

    signupApi='http://localhost:3000/engineer/signup'

    engineerSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }

    componyReg(data:componyRegistration):Observable<any>{
        const componyRegApi=`http://localhost:3000/engineer/componyRegistration/${this.id}`
        
        return this.http.post(componyRegApi,data)
    }

    componyDetails():Observable<any>{
        const componyDetailsApi='http://localhost:3000/engineer/componyDetails'

        return this.http.get(componyDetailsApi)
    }

    componyUp(data:componyRegistration):Observable<any>{
        const componyUpApi='http://localhost:3000/engineer/componyUpdation'
        
        return this.http.post(componyUpApi,data)
    }
}