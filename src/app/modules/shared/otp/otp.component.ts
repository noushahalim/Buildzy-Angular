import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp:string=''
  isButtonEnabled = true;
  countdown = 30;
  intervalId: any;

  @Input() email:string=''
  @Input() error:string=''
  @Output() otpSubmitted = new EventEmitter<any>();
  @Output() otpResend = new EventEmitter<any>();
  
  onOtpChange(data:any){
    this.otp=data
  }
  onSubmit(){
    
    if(this.otp.length==4){      
      this.otpSubmitted.emit(this.otp);
    }
  }

  handleClick() {
    if (!this.isButtonEnabled) {
      return;
    }
    
    this.otpResend.emit();
    
    this.isButtonEnabled = false;
    this.startCountdown();
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.isButtonEnabled = true;
        this.countdown = 30;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

}
