import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';

import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';

import { HomeComponent } from './home/home.component';
import { EngineersListComponent } from './engineers-list/engineers-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ClientchatPageComponent } from './clientchat-page/clientchat-page.component';
import { ClientChatsListComponent } from './client-chats-list/client-chats-list.component';
import { WorkRequestDetailsComponent } from './work-request-details/work-request-details.component';
import { ClientWorksComponent } from './client-works/client-works.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { ClientNavbarComponent } from './client-navbar/client-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientAboutUsComponent } from './client-about-us/client-about-us.component';
import { FooterComponent } from './footer/footer.component';

registerLocaleData(localeIn, 'en-IN');

@NgModule({
  declarations: [
    HomeComponent,
    EngineersListComponent,
    CompanyDetailsComponent,
    ClientchatPageComponent,
    ClientChatsListComponent,
    WorkRequestDetailsComponent,
    ClientWorksComponent,
    WorkDetailsComponent,
    ClientNavbarComponent,
    ClientAboutUsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
})
export class ClientModule { }
