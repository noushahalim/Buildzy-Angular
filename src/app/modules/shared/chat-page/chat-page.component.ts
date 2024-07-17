import { Location } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CommonService } from 'src/app/services/common.service';
import { EngineerService } from 'src/app/services/engineer.service';
import { VideoCallService } from 'src/app/services/videoCall.service';

@Component({
  selector: 'shared-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit , OnChanges , AfterViewChecked , OnDestroy {
  @Input() receiverDatas: any = '';
  @Input() chats: any = '';
  @Input() connected: boolean = false;
  @Input() role: string = '';
  @Input() sender: string = '';
  @Input() receiver: string = '';
  newMessage: string = '';
  messages: any[] = [];
  chatSessions: { [key: string]: any[] } = {};
  activeChatKey: string = '';
  callStatus: string = 'idle';
  isAudioMuted: boolean = false;
  isVideoMuted: boolean = false;

  @ViewChild('chatWindow') chatWindow!: ElementRef;
  @ViewChild('chatWindow2') chatWindow2!: ElementRef;
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  constructor(
    private chatService: ChatService,
    private commonService: CommonService,
    private engineerService: EngineerService,
    private videoCallService: VideoCallService,
    private location: Location
  ) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.onMessage().subscribe((message: any) => {
      const chatKey = this.getChatKey(message.sender, message.receiver);
      if (!this.chatSessions[chatKey]) {
        this.chatSessions[chatKey] = [];
      }
      this.chatSessions[chatKey].push(message);
      if (chatKey === this.activeChatKey) {
        this.messages.push(message);
      }
      this.scrollToBottom();
    });

    this.videoCallService.getCallStatus().subscribe(status => {
      this.callStatus = status;
      this.updateVideoStreams();
      if (status === 'idle') {
        this.updateVideoStreams();
      }
    });

    this.chatService.onSignalingMessage().subscribe((message: any) => {
      switch (message.type) {
        case 'offer':
          this.videoCallService.handleOffer(message.offer, message.sender);
          break;
        case 'answer':
          this.videoCallService.handleAnswer(message.answer);
          break;
        case 'candidate':
          this.videoCallService.handleIceCandidate(message.candidate);
          break;
        case 'reject':
          this.videoCallService.handleReject();
          break;
        case 'endCall':
          this.videoCallService.handleRemoteEndCall();
          break;
      }
      this.updateVideoStreams();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sender'] && changes['sender'].currentValue) {
      // const id= this.sender+this.receiver
      this.chatService.register(this.sender);
    }
    if (changes['receiver'] && changes['receiver'].currentValue) {
      this.activeChatKey = this.getChatKey(this.sender, this.receiver);
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

  ngAfterViewInit() {
    this.updateVideoStreams();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    if(this.callStatus!='idle'){
      this.videoCallService.endCall();
    }
  }

  getChatKey(sender: string, receiver: string): string {
    return [sender, receiver].sort().join('-');
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
      (res) => {},
      (error) => {
        console.log(error);
      }
    );
    if (!this.chatSessions[this.activeChatKey]) {
      this.chatSessions[this.activeChatKey] = [];
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
    if (this.chatWindow2) {
      const chatContainer = this.chatWindow2.nativeElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  requestAccept(id: string) {
    this.engineerService.requestAccept(id).subscribe(
      (response) => {
        this.connected = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  backButton() {
    this.location.back();
  }

  startVideoCall() {
    this.videoCallService.startCall(this.receiver);
  }

  acceptCall() {
    this.videoCallService.acceptCall();
  }

  rejectCall() {
    this.videoCallService.rejectCall();
  }

  endCall() {
    this.videoCallService.endCall();
  }

  toggleAudio() {
    this.isAudioMuted = !this.isAudioMuted;
    this.videoCallService.toggleAudio();
  }

  toggleVideo() {
    this.isVideoMuted = !this.isVideoMuted;
    this.videoCallService.toggleVideo();
  }

  updateVideoStreams() {
    const localStream = this.videoCallService.getLocalStream();
    const remoteStream = this.videoCallService.getRemoteStream();

    if (this.localVideo) {
      this.localVideo.nativeElement.srcObject = localStream;
      this.localVideo.nativeElement.style.display = localStream ? 'block' : 'none';
    }
    if (this.remoteVideo) {
      this.remoteVideo.nativeElement.srcObject = remoteStream;
      this.remoteVideo.nativeElement.style.display = remoteStream ? 'block' : 'none';
    }
  }
}