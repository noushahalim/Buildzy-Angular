import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EngineersListComponent } from "./engineers-list/engineers-list.component";

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'engineers',component:EngineersListComponent}
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