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

  componyDatas:any=''

  ngOnInit() {
    if(this.clientService.componyDatas){
      this.componyDatas=this.clientService.componyDatas
    }
    else{
      this.clientService.componyDatasGet().subscribe(
        (response)=>{
          this.componyDatas=response
          this.clientService.componyDatas=response        
        },
        (error:any)=>{
          this.router.navigate(['/'])
          console.log(error)
        }
      )
    }
  }

  componyDetails(id:any){
    this.router.navigate(['/componyDetails',id])
  }
}
