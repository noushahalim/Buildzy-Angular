import { Component, Input } from "@angular/core";

@Component({
    selector:'shared-input',
    templateUrl:'input.component.html'
})

export class InputComponent{
    @Input() type:string='text'
    @Input() placeholder:string=''
    @Input() style:string='border border-black'
    @Input() name:string=''
}