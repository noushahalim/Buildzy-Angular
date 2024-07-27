import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.css']
})
export class MyCompanyComponent {
  companyDetails: any;
  error: any;
  reviews: any[] = [];

  constructor(private engineerService:EngineerService, private clientService:ClientService){}

  ngOnInit() {
    this.engineerService.companyDetails().subscribe(
      (response)=>{
        this.companyDetails = response

        this.clientService.companyReviews(this.companyDetails._id).subscribe(
          (response)=>{
            this.reviews = response
          },
          (error)=>{
            console.log(error);
          }
        )
      },
      (error)=>{
        this.error = error
      }
    )

  }
}
