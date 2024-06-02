import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClientSignupComponent } from "./clientSignup/clientSignup.component";
import { loginComponent } from "./login/login.component";

const routes : Routes= [
    {path:'signup',component:ClientSignupComponent},
    {path:'login',component:loginComponent}
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