import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { companyRegistration } from 'src/app/models/companyRegistration';
import { CommonService } from 'src/app/services/common.service';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'engineer-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent {
  constructor(private engineerService:EngineerService , private commonService:CommonService , private router:Router){}

  companyReg(data:any){
    
    const datas : companyRegistration =data as companyRegistration
    
    this.engineerService.companyReg(datas).subscribe(
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
