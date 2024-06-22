import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ComponyRegistrationComponent } from "./compony-registration/compony-registration.component";
import { MyComponyComponent } from "./my-compony/my-compony.component";
import { ComponyEditComponent } from "./compony-edit/compony-edit.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'componyRegistration',component:ComponyRegistrationComponent},
    {path:'componyEdit',component:ComponyEditComponent},
    {path:'myCompony',component:MyComponyComponent}
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