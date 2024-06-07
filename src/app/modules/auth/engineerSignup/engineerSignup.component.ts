import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "src/app/models/signup";
import { CommonService } from "src/app/services/common.service";
import { EngineerService } from "src/app/services/engineer.service";

@Component({
    selector:'auth-engineerSignup',
    templateUrl:'engineerSignup.component.html'
})

export class EngineerSignup{
    constructor(private engineerService:EngineerService, private commonService:CommonService , private route: Router){}

    @Output() formDataReceived = new EventEmitter<any>();

    backendError:string =''

    onFormDataSubmitted(formData: any) {
        const datas:signupModel =formData as signupModel
        this.engineerService.engineerSignup(datas).subscribe(
            (response)=>{
                this.commonService.id=response.engineerId
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