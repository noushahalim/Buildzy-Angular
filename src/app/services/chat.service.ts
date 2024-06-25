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

  register(clientId:string) {
    if (this.socket) {
      this.socket.emit('register', clientId);
    }
  }

  sendMessage(message: any) {
    if (this.socket) {
      this.socket.emit('sendMessage', message);
    }
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      if (this.socket) {
        this.socket.on('receivedMessage', (message) => {
          observer.next(message);
        });
      }
    });
  }
}
