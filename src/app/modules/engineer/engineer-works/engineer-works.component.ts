import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-engineer-works',
  templateUrl: './engineer-works.component.html',
  styleUrls: ['./engineer-works.component.css']
})
export class EngineerWorksComponent implements OnInit{
  constructor(private commonService:CommonService , private engineerService:EngineerService, private router:Router){}

  works:any=[]

  ngOnInit(): void {
    if(this.commonService.token){
      this.engineerService.engineerWorks().subscribe(
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
    this.router.navigate(['engineer/workDetails', workId]);
  }

  getLastMilestoneDescription(milestones: any[]): string {
    const lastMilestone = milestones.reverse().find(milestone => milestone.status === true);
    return lastMilestone ? lastMilestone.description : 'No milestones completed';
  }
}
