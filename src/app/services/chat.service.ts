import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socketUrl = environment.socketUrl
  private socket!: Socket;

  connect() {
    this.socket = io(this.socketUrl)
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

  sendSignalingMessage(message: any) {
    if (this.socket) {
        this.socket.emit('signalingMessage', message);
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

  onSignalingMessage(): Observable<any> {
    return new Observable(observer => {
        if (this.socket) {
            this.socket.on('signalingMessage', (message) => {
                observer.next(message);
            });
        }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}