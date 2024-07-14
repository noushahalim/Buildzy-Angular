import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { signupModel } from "../models/signup";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn:'root'
})

export class ClientService{
    constructor(private http:HttpClient, private router:Router){}

    api = environment.baseUrl
    companyDatas:any=''
    
    signupApi=`${this.api}/client/signup`

    clientSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }

    companyDatasApi=`${this.api}/client/companyDatas`

    companyDatasGet():Observable<any>{
        return this.http.get(this.companyDatasApi)
    }

    companyDetailsGet(id:string):Observable<any>{
        const companyDetailsApi=`${this.api}/client/companyDetails/${id}`
        return this.http.get(companyDetailsApi)
    }

    companyConnect(id:string):Observable<any>{
        const companyConnectApi=`${this.api}/client/companyConnect/${id}`
        return this.http.get(companyConnectApi)
    }

    companyChats(id:string):Observable<any>{
        const companyChatsApi=`${this.api}/client/companyChats/${id}`
        return this.http.get(companyChatsApi)
    }

    companyChatsList():Observable<any>{
        const companyChatsListApi=`${this.api}/client/companyChatsList/`
        return this.http.get(companyChatsListApi)
    }

    workRequests(id:string):Observable<any>{
        const workRequestsApi=`${this.api}/client/workRequests/${id}`
        return this.http.get(workRequestsApi)
    }

    agreeWorkRequest(id:string):Observable<any>{
        const agreeWorkRequestApi=`${this.api}/client/agreeWorkRequest/${id}`
        return this.http.get(agreeWorkRequestApi)
    }

    deleteWorkRequest(id:string):Observable<any>{
        const deleteWorkRequestApi=`${this.api}/client/deleteWorkRequest/${id}`
        return this.http.delete(deleteWorkRequestApi)
    }

    workDetails(id:string):Observable<any>{
        const workDetailsApi=`${this.api}/client/workDetails/${id}`
        return this.http.get(workDetailsApi)
    }

    works():Observable<any>{
        const worksApi=`${this.api}/client/works/`
        return this.http.get(worksApi)
    }
}