import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClientSignupComponent } from "./clientSignup/clientSignup.component";
import { loginComponent } from "./login/login.component";
import { EngineerSignup } from "./engineerSignup/engineerSignup.component";
import { SignupOtpComponent } from "./signupOtp/signupOtp.component";
import { ForgotPasswordComponent } from "./forgotPassword/forgotPassword.component";

const routes : Routes= [
    {path:'signup',component:ClientSignupComponent},
    {path:'login',component:loginComponent},
    {path:'engineer/signup',component:EngineerSignup},
    {path:'signupOtp',component:SignupOtpComponent},
    {path:'forgotPassword',component:ForgotPasswordComponent}
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule{}