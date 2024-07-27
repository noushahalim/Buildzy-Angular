import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';
import { CompanyRegistrationFormComponent } from './company-registration-form/company-registration-form.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    ButtonComponent,
    SignupComponent,
    OtpComponent,
    CompanyRegistrationFormComponent,
    ChatPageComponent,
    RatingComponent
  ],
  exports:[
    ButtonComponent,
    SignupComponent,
    OtpComponent,
    CompanyRegistrationFormComponent,
    ChatPageComponent,
    RatingComponent
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
