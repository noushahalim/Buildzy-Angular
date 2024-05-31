import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    InputComponent
  ],
  exports:[
    NavbarComponent,
    ButtonComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
