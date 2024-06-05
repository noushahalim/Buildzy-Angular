import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { signupModel } from "../models/signup";

@Injectable({
    providedIn:'root'
})

export class ClientService{
    constructor(private http:HttpClient, private router:Router){}
    
    signupApi='http://localhost:3000/client/signup'

    clientSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }
}