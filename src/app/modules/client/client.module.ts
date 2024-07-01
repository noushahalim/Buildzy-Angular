import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ClientRoutingModule } from "./client-routing.module";
import { EngineersListComponent } from './engineers-list/engineers-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ClientchatPageComponent } from './clientchat-page/clientchat-page.component';
import { ClientChatsListComponent } from './client-chats-list/client-chats-list.component';

@NgModule({
    declarations:[
        HomeComponent,
        EngineersListComponent,
        CompanyDetailsComponent,
        ClientchatPageComponent,
        ClientChatsListComponent
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