import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EngineersListComponent } from "./engineers-list/engineers-list.component";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
import { CompanyDetailsResolver } from "src/app/resolver/company-details.resolver";
import { ClientchatPageComponent } from "./clientchat-page/clientchat-page.component";
import { ClientChatsListComponent } from "./client-chats-list/client-chats-list.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'engineers',component:EngineersListComponent},
    {path:'companyDetails/:id',component:CompanyDetailsComponent, resolve:{companyDetails:CompanyDetailsResolver}},
    {path:'chatDetails/:id',component:ClientchatPageComponent},
    {path:'chats',component:ClientChatsListComponent}
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class ClientRoutingModule{

}