import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    InputComponent,
    SignupComponent
  ],
  exports:[
    NavbarComponent,
    ButtonComponent,
    InputComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
