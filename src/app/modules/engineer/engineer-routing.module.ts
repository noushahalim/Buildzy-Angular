import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ComponyRegistrationComponent } from "./compony-registration/compony-registration.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'componyRegistration',component:ComponyRegistrationComponent}
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