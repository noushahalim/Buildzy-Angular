import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "src/app/models/signup";
import { ClientService } from "src/app/services/client.service";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector:'auth-clientSignup',
    templateUrl:'clientSignup.component.html'
})

export class ClientSignupComponent{

    constructor(private clientService:ClientService, private commonService:CommonService, private route: Router){}

    @Output() formDataReceived = new EventEmitter<any>();

    backendError:string =''
    
    onFormDataSubmitted(formData: any) {
        const datas:signupModel =formData as signupModel
        this.clientService.clientSignup(datas).subscribe(
            (response)=>{
                this.commonService.id=response.clientId
                this.commonService.email=response.email
                this.route.navigate(['/auth/signupOtp'])
            },
            (error:any)=>{
                if(error.status==400){
                    this.backendError=error.error
                    setTimeout(() => {
                        this.backendError=''
                    }, 3000);
                }
                else{
                    console.log(error)
                }
            }
        )
    }
}