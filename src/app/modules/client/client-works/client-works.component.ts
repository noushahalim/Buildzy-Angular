import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-client-works',
  templateUrl: './client-works.component.html',
  styleUrls: ['./client-works.component.css']
})
export class ClientWorksComponent implements OnInit{
  constructor(private commonService:CommonService , private clientService:ClientService, private router:Router){}

  works:any=[]

  ngOnInit(): void {
    if(this.commonService.token){
      this.clientService.works().subscribe(
        (response)=>{
          this.works = response
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

  viewDetails(workId: string) {
    this.router.navigate(['/workDetails', workId]);
  }

  getLastMilestoneDescription(milestones: any[]): string {
    const lastMilestone = milestones.reverse().find(milestone => milestone.status === true);
    return lastMilestone ? lastMilestone.description : 'No milestones completed';
  }
}
