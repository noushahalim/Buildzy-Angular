import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-compony-details',
  templateUrl: './compony-details.component.html',
  styleUrls: ['./compony-details.component.css']
})
export class ComponyDetailsComponent implements OnInit{
  componyDetails: any;
  error: any;
  connectionStatus: boolean = false

  constructor(private clientService:ClientService , private route:ActivatedRoute , private router:Router){}

  ngOnInit() {
    this.route.data.subscribe(
      (data)=>{
        this.componyDetails = data['componyDetails'];
      },
      (error)=>{
        this.error = error
      }
    )
    this.clientService.componyChats(this.componyDetails.engineerId).subscribe(
      (response)=>{
        this.connectionStatus = true
      }
    )
    
  }

  connectNow(){
    this.clientService.componyConnect(this.componyDetails.engineerId).subscribe(
      (response)=>{
        this.connectionStatus = true
      },
      (error)=>{
        console.log('error while commect',error);
      }
    )
  }

  messageNow(){
    this.router.navigate(['/chatDetails',this.componyDetails.engineerId])
  }
}
