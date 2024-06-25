import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clientchat-page',
  templateUrl: './clientchat-page.component.html',
  styleUrls: ['./clientchat-page.component.css']
})
export class ClientchatPageComponent implements OnInit{
  constructor(private route:ActivatedRoute , private clientService:ClientService){}

  engineerId:string=''
  componyDatas:any =''
  client:string =''
  engineer:string =''
  chats:any =''
  connected:boolean =false

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.engineerId = params['id'];
    })

    this.clientService.componyChats(this.engineerId).subscribe(
      (response)=>{
        this.chats=response.chats
        this.componyDatas= response.compony
        this.engineer= this.componyDatas.engineerId
        this.client= response.client
        if(this.chats){
          if(this.chats.status==true){
            this.connected=true
          }
        }
      },
      (error:any)=>{
        console.log('error while chats loading: ',error)
      }
    )

    
  }
}
