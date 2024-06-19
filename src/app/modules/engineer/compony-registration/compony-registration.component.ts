import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { componyRegistration } from 'src/app/models/componyRegistration';
import { CommonService } from 'src/app/services/common.service';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'engineer-compony-registration',
  templateUrl: './compony-registration.component.html',
  styleUrls: ['./compony-registration.component.css']
})
export class ComponyRegistrationComponent {
  constructor(private engineerService:EngineerService , private commonService:CommonService , private router:Router){}

  componyReg(data:any){
    
    const datas : componyRegistration =data as componyRegistration
    
    this.engineerService.componyReg(datas).subscribe(
      (response)=>{
        localStorage.setItem('token',response.token)
        localStorage.setItem('accessType',response.role)
        this.commonService.token=response.token
        this.commonService.accessType=response.role
        this.engineerService.id= ''
        this.router.navigate(['/engineer'])
        
      },
      (error) => {
        console.error('Error:', error);
        alert('invalid access to server');
      }
    )
    
  }
}
