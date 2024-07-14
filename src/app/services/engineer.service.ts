import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "../models/signup";
import { Observable } from "rxjs";
import { companyRegistration } from "../models/companyRegistration";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn:'root'
})

export class EngineerService{
    constructor(private http:HttpClient, private router:Router){}

    api = environment.baseUrl
    companyData:any=''
    companyRegistrationStatus:boolean=false
    id:string=''

    signupApi=`${this.api}/engineer/signup`

    engineerSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }

    companyReg(data:companyRegistration):Observable<any>{
        const companyRegApi=`${this.api}/engineer/companyRegistration/${this.id}`
        
        return this.http.post(companyRegApi,data)
    }

    companyDetails():Observable<any>{
        const companyDetailsApi=`${this.api}/engineer/companyDetails`

        return this.http.get(companyDetailsApi)
    }

    companyUp(data:companyRegistration):Observable<any>{
        const companyUpApi=`${this.api}/engineer/companyUpdation`
        
        return this.http.post(companyUpApi,data)
    }

    clientChats(id:string):Observable<any>{
        const clientChatsApi=`${this.api}/engineer/clientChats/${id}`
        return this.http.get(clientChatsApi)
    }

    clientChatsList():Observable<any>{
        const clientChatsListApi=`${this.api}/engineer/clientChatsList/`
        return this.http.get(clientChatsListApi)
    }

    requestAccept(id:string):Observable<any>{
        const requestAcceptApi=`${this.api}/engineer/requestAccept/${id}`
        return this.http.get(requestAcceptApi)
    }

    clientDetails(id:string):Observable<any>{
        const clientDetailsApi=`${this.api}/engineer/clientDetails/${id}`
        return this.http.get(clientDetailsApi)
    }

    submitWorkRequest(data:any):Observable<any>{
        const submitWorkRequestApi=`${this.api}/engineer/submitWorkRequest`
        return this.http.post(submitWorkRequestApi,data)
    }

    engineerWorks():Observable<any>{
        const engineerWorksApi=`${this.api}/engineer/engineerWorks/`
        return this.http.get(engineerWorksApi)
    }

    engineerWorkDetails(id:string):Observable<any>{
        const engineerWorkDetailsApi=`${this.api}/engineer/engineerWorkDetails/${id}`
        return this.http.get(engineerWorkDetailsApi)
    }

    updateMilestones(workId:any,milestones:any):Observable<any>{
        const updateMilestonesApi=`${this.api}/engineer/updateMilestones`
        return this.http.post(updateMilestonesApi,{workId,milestones})
    }
}