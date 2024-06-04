import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    SignupComponent
  ],
  exports:[
    NavbarComponent,
    ButtonComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
