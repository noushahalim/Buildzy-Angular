import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CompanyRegistrationComponent } from "./company-registration/company-registration.component";
import { MyCompanyComponent } from "./my-company/my-company.component";
import { CompanyEditComponent } from "./company-edit/company-edit.component";
import { EngineerChatPageComponent } from "./engineer-chat-page/engineer-chat-page.component";
import { EngineerChatsListComponent } from "./engineer-chats-list/engineer-chats-list.component";
import { WorkRequestComponent } from "./work-request/work-request.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'companyRegistration',component:CompanyRegistrationComponent},
    {path:'companyEdit',component:CompanyEditComponent},
    {path:'myCompany',component:MyCompanyComponent},
    {path:'chatDetails/:id',component:EngineerChatPageComponent},
    {path:'chats',component:EngineerChatsListComponent},
    {path:'workRequest/:id',component:WorkRequestComponent}
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