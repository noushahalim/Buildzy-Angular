import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "src/app/models/signup";
import { EngineerService } from "src/app/services/engineer.service";

@Component({
    selector:'auth-engineerSignup',
    templateUrl:'engineerSignup.component.html'
})

export class EngineerSignup{
    constructor(private engineerService:EngineerService, private route: Router){}

    @Output() formDataReceived = new EventEmitter<any>();

    onFormDataSubmitted(formData: any) {
        const datas:signupModel =formData as signupModel
        this.engineerService.engineerSignup(datas).subscribe(
            (response)=>{
                this.route.navigate(['/auth/login'])
            },
            (error:any)=>{
                console.log(error)
            }
        )
    }
}