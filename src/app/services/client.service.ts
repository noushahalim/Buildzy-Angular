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

    companyDatas:any=''
    
    signupApi='http://localhost:3000/client/signup'

    clientSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }

    companyDatasApi='http://localhost:3000/client/companyDatas'

    companyDatasGet():Observable<any>{
        return this.http.get(this.companyDatasApi)
    }

    companyDetailsGet(id:string):Observable<any>{
        const companyDetailsApi=`http://localhost:3000/client/companyDetails/${id}`
        return this.http.get(companyDetailsApi)
    }

    companyConnect(id:string):Observable<any>{
        const companyConnectApi=`http://localhost:3000/client/companyConnect/${id}`
        return this.http.get(companyConnectApi)
    }

    companyChats(id:string):Observable<any>{
        const companyChatsApi=`http://localhost:3000/client/companyChats/${id}`
        return this.http.get(companyChatsApi)
    }

    companyChatsList():Observable<any>{
        const companyChatsListApi='http://localhost:3000/client/companyChatsList/'
        return this.http.get(companyChatsListApi)
    }

    workRequests(id:string):Observable<any>{
        const workRequestsApi=`http://localhost:3000/client/workRequests/${id}`
        return this.http.get(workRequestsApi)
    }

    agreeWorkRequest(id:string):Observable<any>{
        const agreeWorkRequestApi=`http://localhost:3000/client/agreeWorkRequest/${id}`
        return this.http.get(agreeWorkRequestApi)
    }

    deleteWorkRequest(id:string):Observable<any>{
        const deleteWorkRequestApi=`http://localhost:3000/client/deleteWorkRequest/${id}`
        return this.http.delete(deleteWorkRequestApi)
    }

    workRequestDetails(id:string):Observable<any>{
        const workRequestDetailsApi=`http://localhost:3000/client/workRequestDetails/${id}`
        return this.http.get(workRequestDetailsApi)
    }

    works():Observable<any>{
        const worksApi='http://localhost:3000/client/works/'
        return this.http.get(worksApi)
    }
}