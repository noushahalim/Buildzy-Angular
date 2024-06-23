import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  @Input() componyDatas:any =''
  @Input() chats:any =''
  @Input() connected:boolean =false
}
