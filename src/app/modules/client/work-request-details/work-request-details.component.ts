import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-work-request-details',
  templateUrl: './work-request-details.component.html',
  styleUrls: ['./work-request-details.component.css']
})
export class WorkRequestDetailsComponent implements OnInit{

  constructor(private route:ActivatedRoute, private clientService:ClientService, private router:Router){}

  workRequestId:string=''
  workDetails:any=[]

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.workRequestId = params['id']
    })

    this.clientService.workRequestDetails(this.workRequestId).subscribe(
      (response)=>{
        this.workDetails=response
        if(this.workDetails.status==true){
          this.router.navigate(['/'])
        }
      },
      (error)=>{
        console.log(error);
        this.router.navigate(['/'])
      }
    )
  }

  agreeProject(id:string){
    this.clientService.agreeWorkRequest(id).subscribe(
      (response)=>{
        this.router.navigate(['/works'])
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteProject(id:string){
    this.clientService.deleteWorkRequest(id).subscribe(
      (response)=>{
        this.router.navigate(['/'])
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
}
