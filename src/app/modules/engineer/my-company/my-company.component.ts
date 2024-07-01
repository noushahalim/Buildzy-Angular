import { Component } from '@angular/core';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.css']
})
export class MyCompanyComponent {
  companyDetails: any;
  error: any;

  constructor(private engineerService:EngineerService){}

  ngOnInit() {
    this.engineerService.companyDetails().subscribe(
      (response)=>{
        this.companyDetails = response
      },
      (error)=>{
        this.error = error
      }
    )
  }
}
