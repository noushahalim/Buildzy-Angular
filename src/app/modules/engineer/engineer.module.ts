import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EngineerRoutingModule } from './engineer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCompanyComponent } from './my-company/my-company.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { EngineerChatPageComponent } from './engineer-chat-page/engineer-chat-page.component';
import { EngineerChatsListComponent } from './engineer-chats-list/engineer-chats-list.component';
import { WorkRequestComponent } from './work-request/work-request.component';
import { EngineerNavbarComponent } from './engineer-navbar/engineer-navbar.component';
import { EngineerWorksComponent } from './engineer-works/engineer-works.component';
import { EngineerWorkDetailsComponent } from './engineer-work-details/engineer-work-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    CompanyRegistrationComponent,
    MyCompanyComponent,
    CompanyEditComponent,
    EngineerChatPageComponent,
    EngineerChatsListComponent,
    WorkRequestComponent,
    EngineerNavbarComponent,
    EngineerWorksComponent,
    EngineerWorkDetailsComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EngineerModule { }
