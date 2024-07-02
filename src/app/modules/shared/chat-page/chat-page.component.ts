import { Location } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CommonService } from 'src/app/services/common.service';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'shared-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit , OnChanges , AfterViewChecked{
  @Input() receiverDatas:any =''
  @Input() chats:any =''
  @Input() connected:boolean =false
  @Input() role:string=''
  @Input() sender:string=''
  @Input() receiver:string=''
  newMessage:string=''
  messages :any[]=[]
  chatSessions:{[key:string] :any[]}={};
  activeChatKey:string = '';

  @ViewChild('chatWindow') chatWindow!: ElementRef;

  constructor(private chatService: ChatService , private commonService: CommonService , private engineerService:EngineerService , private location: Location) {}

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
      this.scrollToBottom();
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
    if (changes['chats'] && changes['chats'].currentValue) {
      const chatKey = this.getChatKey(this.chats.clientId, this.chats.engineerId);
      if (!this.chatSessions[chatKey]) {
        this.chatSessions[chatKey] = [];
      }
      this.chatSessions[chatKey] = this.chats.messages;
      if (chatKey === this.activeChatKey) {
        this.messages = [...this.chats.messages];
      }
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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
    this.commonService.chatSave(message).subscribe(
      (res)=>{},
      (error)=>{
        console.log(error);
        
      }
    )
    if(!this.chatSessions[this.activeChatKey]){
      this.chatSessions[this.activeChatKey]= [];
    }
    this.chatSessions[this.activeChatKey].push(message);
    this.messages.push(message);
    this.newMessage = '';
  }

  scrollToBottom() {
    if (this.chatWindow) {
      const chatContainer = this.chatWindow.nativeElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  requestAccept(id:string){
    this.engineerService.requestAccept(id).subscribe(
      (response)=>{
        this.connected=true
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  backButton(){
    this.location.back();
  }
}
