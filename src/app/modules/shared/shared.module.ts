import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    SignupComponent,
    OtpComponent
  ],
  exports:[
    NavbarComponent,
    ButtonComponent,
    SignupComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ]
})
export class SharedModule { }
