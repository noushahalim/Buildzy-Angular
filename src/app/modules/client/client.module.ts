import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ClientRoutingModule } from "./client-routing.module";

@NgModule({
    declarations:[
        HomeComponent
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