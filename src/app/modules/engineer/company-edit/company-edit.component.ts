import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { companyRegistration } from 'src/app/models/companyRegistration';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent {
  constructor(private engineerService:EngineerService , private router:Router){}

  companyUp(data:any){
    
    const datas : companyRegistration =data as companyRegistration
    
    this.engineerService.companyUp(datas).subscribe(
      (response)=>{
        this.router.navigate(['/engineer'])
        
      },
      (error) => {
        console.error('Error:', error);
        alert('invalid access to server');
      }
    )
    
  }
}
