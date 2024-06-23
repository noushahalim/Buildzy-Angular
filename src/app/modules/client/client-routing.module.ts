import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EngineersListComponent } from "./engineers-list/engineers-list.component";
import { ComponyDetailsComponent } from "./compony-details/compony-details.component";
import { ComponyDetailsResolver } from "src/app/resolver/compony-details.resolver";
import { ClientchatPageComponent } from "./clientchat-page/clientchat-page.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'engineers',component:EngineersListComponent},
    {path:'componyDetails/:id',component:ComponyDetailsComponent, resolve:{componyDetails:ComponyDetailsResolver}},
    {path:'chatDetails/:id',component:ClientchatPageComponent}
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