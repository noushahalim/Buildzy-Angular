import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() style:string= "bg-black text-white hover:bg-white hover:text-black"
  @Input() name:string= "default"
  @Input() routerLink:string=''
  @Input() type:string=''
}
