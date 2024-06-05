import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { signupModel } from "src/app/models/signup";
import { ClientService } from "src/app/services/client.service";

@Component({
    selector:'auth-clientSignup',
    templateUrl:'clientSignup.component.html'
})

export class ClientSignupComponent{

    constructor(private clientService:ClientService, private route: Router){}

    @Output() formDataReceived = new EventEmitter<any>();

    onFormDataSubmitted(formData: any) {
        const datas:signupModel =formData as signupModel
        this.clientService.clientSignup(datas).subscribe(
            (response)=>{
                this.route.navigate(['/auth/login'])
            },
            (error:any)=>{
                console.log(error)
            }
        )
    }
}