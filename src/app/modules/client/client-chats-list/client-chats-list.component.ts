import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-chats-list',
  templateUrl: './client-chats-list.component.html',
  styleUrls: ['./client-chats-list.component.css']
})
export class ClientChatsListComponent implements OnInit{
  constructor(private clientService:ClientService){}
  companyList:any=[]

  ngOnInit() {
    this.clientService.companyChatsList().subscribe(
      (response)=>{
        this.companyList=response
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
