import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'shared-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit , OnChanges{
  @Input() receiverDatas:any =''
  @Input() chats:any =''
  @Input() connected:boolean =false
  @Input() sender:string=''
  @Input() receiver:string=''
  newMessage:string=''
  messages :any[]=[]
  chatSessions:{[key:string] :any[]}={};
  activeChatKey:string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.onMessage().subscribe((message: any) => {
      const chatKey = this.getChatKey(message.sender,message.receiver);
      if(!this.chatSessions[chatKey]){
        this.chatSessions[chatKey] = [];
      }
      this.chatSessions[chatKey].push(message);
      if(chatKey === this.activeChatKey){
        this.messages.push(message);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sender'] && changes['sender'].currentValue) {
      this.chatService.register(this.sender);
    }
    if (changes['receiver'] && changes['receiver'].currentValue){
      this.activeChatKey = this.getChatKey(this.sender,this.receiver);
      this.messages = this.chatSessions[this.activeChatKey] || [];
    }
  }

  getChatKey(sender:string,receiver:string):string{
    return [sender,receiver].sort().join('-');
  }

  sendMessage() {
    const message = {
      sender: this.sender,
      receiver: this.receiver,
      message: this.newMessage,
      time: new Date()
    };
    
    this.chatService.sendMessage(message);
    if(!this.chatSessions[this.activeChatKey]){
      this.chatSessions[this.activeChatKey]= [];
    }
    this.chatSessions[this.activeChatKey].push(message);
    this.messages.push(message);
    this.newMessage = '';
  }
}
