import { Component, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'shared-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  @Input() componyDatas:any =''
  @Input() chats:any =''
  @Input() connected:boolean =false
  @Input() sender:string=''
  @Input() reciver:string=''
  newMessage:string=''
  messages :[{sender:string,reciver:string,message:string,time:Date}]=[{sender:'',reciver:'',message:'',time:new Date}]

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.onMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    const message = {
      sender: this.sender,
      receiver: this.reciver,
      message: this.newMessage,
      time: new Date()
    };
    
    this.chatService.sendMessage(message);
    this.newMessage = '';
  }
}
