import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  companyDetails: any;
  error: any;
  connectionStatus: boolean = false

  constructor(private clientService:ClientService , private route:ActivatedRoute , private router:Router){}

  ngOnInit() {
    this.route.data.subscribe(
      (data)=>{
        this.companyDetails = data['companyDetails'];
      },
      (error)=>{
        this.error = error
      }
    )
    this.clientService.companyChats(this.companyDetails.engineerId).subscribe(
      (response)=>{
        this.connectionStatus = true
      }
    )
    
  }

  connectNow(){
    this.clientService.companyConnect(this.companyDetails.engineerId).subscribe(
      (response)=>{
        this.connectionStatus = true
      },
      (error)=>{
        console.log('error while commect',error);
      }
    )
  }

  messageNow(){
    this.router.navigate(['/chatDetails',this.companyDetails.engineerId])
  }
}
