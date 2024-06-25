import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: Socket;

  connect() {
    this.socket = io('http://localhost:3000')
  }

  sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('recivedMessage', (message) => {
        observer.next(message);
      });
    });
  }
}
