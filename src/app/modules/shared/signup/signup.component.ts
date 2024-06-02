import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Input()
  image:string=''
  @Input()
  title:string=''
}
