import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-engineer-chat-page',
  templateUrl: './engineer-chat-page.component.html',
  styleUrls: ['./engineer-chat-page.component.css']
})
export class EngineerChatPageComponent {

  constructor(private route:ActivatedRoute , private engineerService:EngineerService){}

  clientId:string=''
  clientDatas:any =''
  client:string =''
  engineer:string =''
  chats:any =''
  connected:boolean =false

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = params['id'];
    })

    this.engineerService.clientChats(this.clientId).subscribe(
      (response)=>{
        this.chats=response.chats
        this.clientDatas= response.client
        this.client= this.clientDatas._id
        this.engineer= response.engineer
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
