import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ClientSignupComponent } from './clientSignup/clientSignup.component';
import { loginComponent } from './login/login.component';



@NgModule({
  declarations: [
    ClientSignupComponent,
    loginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
