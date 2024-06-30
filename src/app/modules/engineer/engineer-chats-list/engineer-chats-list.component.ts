import { Component, OnInit } from '@angular/core';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-engineer-chats-list',
  templateUrl: './engineer-chats-list.component.html',
  styleUrls: ['./engineer-chats-list.component.css']
})
export class EngineerChatsListComponent implements OnInit{
  constructor(private engineerService:EngineerService){}
  clientList:any

  ngOnInit() {
    this.engineerService.clientChatsList().subscribe(
      (response)=>{
        this.clientList=response
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
