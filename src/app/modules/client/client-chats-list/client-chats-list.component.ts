import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-chats-list',
  templateUrl: './client-chats-list.component.html',
  styleUrls: ['./client-chats-list.component.css']
})
export class ClientChatsListComponent implements OnInit{
  constructor(private clientService:ClientService){}
  componyList:any

  ngOnInit() {
    this.clientService.componyChatsList().subscribe(
      (response)=>{
        this.componyList=response
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
