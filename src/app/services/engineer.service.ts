import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "../models/signup";
import { Observable } from "rxjs";
import { companyRegistration } from "../models/companyRegistration";

@Injectable({
    providedIn:'root'
})

export class EngineerService{
    constructor(private http:HttpClient, private router:Router){}

    companyData:any=''
    companyRegistrationStatus:boolean=false
    id:string=''

    signupApi='http://localhost:3000/engineer/signup'

    engineerSignup(data:signupModel):Observable<any>{
        return this.http.post(this.signupApi,data)
    }

    companyReg(data:companyRegistration):Observable<any>{
        const companyRegApi=`http://localhost:3000/engineer/companyRegistration/${this.id}`
        
        return this.http.post(companyRegApi,data)
    }

    companyDetails():Observable<any>{
        const companyDetailsApi='http://localhost:3000/engineer/companyDetails'

        return this.http.get(companyDetailsApi)
    }

    companyUp(data:companyRegistration):Observable<any>{
        const companyUpApi='http://localhost:3000/engineer/companyUpdation'
        
        return this.http.post(companyUpApi,data)
    }

    clientChats(id:string):Observable<any>{
        const clientChatsApi=`http://localhost:3000/engineer/clientChats/${id}`
        return this.http.get(clientChatsApi)
    }

    clientChatsList():Observable<any>{
        const clientChatsListApi='http://localhost:3000/engineer/clientChatsList/'
        return this.http.get(clientChatsListApi)
    }

    requestAccept(id:string):Observable<any>{
        const requestAcceptApi=`http://localhost:3000/engineer/requestAccept/${id}`
        return this.http.get(requestAcceptApi)
    }

    clientDetails(id:string):Observable<any>{
        const clientDetailsApi=`http://localhost:3000/engineer/clientDetails/${id}`
        return this.http.get(clientDetailsApi)
    }

    submitWorkRequest(data:any):Observable<any>{
        const submitWorkRequestApi='http://localhost:3000/engineer/submitWorkRequest'
        return this.http.post(submitWorkRequestApi,data)
    }

    engineerWorks():Observable<any>{
        const engineerWorksApi='http://localhost:3000/engineer/engineerWorks/'
        return this.http.get(engineerWorksApi)
    }

    engineerWorkDetails(id:string):Observable<any>{
        const engineerWorkDetailsApi=`http://localhost:3000/engineer/engineerWorkDetails/${id}`
        return this.http.get(engineerWorkDetailsApi)
    }

    updateMilestones(workId:any,milestones:any):Observable<any>{
        const updateMilestonesApi='http://localhost:3000/engineer/updateMilestones'
        return this.http.post(updateMilestonesApi,{workId,milestones})
    }
}