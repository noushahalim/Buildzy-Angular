import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ComponyRegistrationComponent } from "./compony-registration/compony-registration.component";
import { MyComponyComponent } from "./my-compony/my-compony.component";
import { ComponyEditComponent } from "./compony-edit/compony-edit.component";
import { EngineerChatPageComponent } from "./engineer-chat-page/engineer-chat-page.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'componyRegistration',component:ComponyRegistrationComponent},
    {path:'componyEdit',component:ComponyEditComponent},
    {path:'myCompony',component:MyComponyComponent},
    {path:'chatDetails/:id',component:EngineerChatPageComponent}
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class EngineerRoutingModule{

}