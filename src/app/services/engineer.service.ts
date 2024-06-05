import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "../models/signup";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class EngineerService{
    constructor(private http:HttpClient, private router:Router){}

    signupApi='http://localhost:3000/engineer/signup'

    engineerSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }
}