import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ClientSignupComponent } from './clientSignup/clientSignup.component';
import { loginComponent } from './login/login.component';
import { EngineerSignup } from './engineerSignup/engineerSignup.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientSignupComponent,
    loginComponent,
    EngineerSignup
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
