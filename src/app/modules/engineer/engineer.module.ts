import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EngineerRoutingModule } from './engineer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponyRegistrationComponent } from './compony-registration/compony-registration.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    ComponyRegistrationComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EngineerModule { }
