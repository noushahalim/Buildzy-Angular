import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';
import { ComponyRegistrationFormComponent } from './compony-registration-form/compony-registration-form.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatsListComponent } from './chats-list/chats-list.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    SignupComponent,
    OtpComponent,
    ComponyRegistrationFormComponent,
    ChatPageComponent,
    ChatsListComponent
  ],
  exports:[
    NavbarComponent,
    ButtonComponent,
    SignupComponent,
    OtpComponent,
    ComponyRegistrationFormComponent,
    ChatPageComponent,
    ChatsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule
  ]
})
export class SharedModule { }
