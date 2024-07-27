import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  companyDetails: any;
  workRequests: any
  error: any;
  connectionStatus: boolean = false
  reviews: any[] = [];

  constructor(private clientService:ClientService , private commonService:CommonService , private route:ActivatedRoute , private router:Router){}

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
    if(this.commonService.token){
      this.clientService.workRequests(this.companyDetails.engineerId).subscribe(
        (response)=>{
          this.workRequests = response
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    
    this.clientService.companyReviews(this.companyDetails._id).subscribe(
      (response)=>{
        this.reviews = response
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  connectNow(){
    this.clientService.companyConnect(this.companyDetails.engineerId).subscribe(
      (response)=>{
        this.connectionStatus = true
      },
      (error)=>{
        console.log('error while connect',error);
      }
    )
  }

  messageNow(){
    this.router.navigate(['/chatDetails',this.companyDetails.engineerId])
  }

  agreeProject(id:string){
    this.clientService.agreeWorkRequest(id).subscribe(
      (response)=>{
        window.location.reload();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteProject(id:string){
    this.clientService.deleteWorkRequest(id).subscribe(
      (response)=>{
        window.location.reload();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  projectDetails(id:string){
    this.router.navigate(['/workRequestDetails',id])
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
