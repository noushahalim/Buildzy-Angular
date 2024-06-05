import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shared-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  @Input() image:string=''
  @Input() title:string=''
  @Input() imageRotate:string=''

  signupForm!:FormGroup

  @Output() formDataSubmitted = new EventEmitter<any>();

  showElement() {
    if (!this.signupForm.touched) {
      return true;
    }
    
    return this.signupForm.touched && this.signupForm.valid;
  }
  

  ngOnInit() {
    this.signupForm=new FormGroup({
      fullName: new FormControl(null,[Validators.required, Validators.minLength(4)]),
      mobileNumber: new FormControl(null,[Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl(null,[Validators.email,Validators.required]),
      password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)])
    });
  }

  

  onFormSubmited(){
    
    if (this.signupForm.valid) {
      this.formDataSubmitted.emit(this.signupForm.value);
      alert('Form submitted successfully!');
    } else {
      console.error('Form is invalid:', this.signupForm.errors);
    }
  }
}
