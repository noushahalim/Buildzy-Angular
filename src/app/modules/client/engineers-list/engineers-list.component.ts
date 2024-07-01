import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-engineers-list',
  templateUrl: './engineers-list.component.html',
  styleUrls: ['./engineers-list.component.css']
})
export class EngineersListComponent implements OnInit{

  constructor(private clientService:ClientService, private router:Router){}

  companyDatas:any=''

  ngOnInit() {
    if(this.clientService.companyDatas){
      this.companyDatas=this.clientService.companyDatas
    }
    else{
      this.clientService.companyDatasGet().subscribe(
        (response)=>{
          this.companyDatas=response
          this.clientService.companyDatas=response        
        },
        (error:any)=>{
          this.router.navigate(['/'])
          console.log(error)
        }
      )
    }
  }

  companyDetails(id:any){
    this.router.navigate(['/companyDetails',id])
  }
}
