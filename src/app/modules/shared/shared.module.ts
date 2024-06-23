import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';
import { ComponyRegistrationFormComponent } from './compony-registration-form/compony-registration-form.component';
import { ChatPageComponent } from './chat-page/chat-page.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    SignupComponent,
    OtpComponent,
    ComponyRegistrationFormComponent,
    ChatPageComponent
  ],
  exports:[
    NavbarComponent,
    ButtonComponent,
    SignupComponent,
    OtpComponent,
    ComponyRegistrationFormComponent,
    ChatPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ]
})
export class SharedModule { }
