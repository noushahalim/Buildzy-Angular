import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ClientRoutingModule } from "./client-routing.module";
import { EngineersListComponent } from './engineers-list/engineers-list.component';
import { ComponyDetailsComponent } from './compony-details/compony-details.component';
import { ClientchatPageComponent } from './clientchat-page/clientchat-page.component';

@NgModule({
    declarations:[
        HomeComponent,
        EngineersListComponent,
        ComponyDetailsComponent,
        ClientchatPageComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        ClientRoutingModule
    ],
    exports:[
        HomeComponent
    ]
})

export class ClientModule{

}