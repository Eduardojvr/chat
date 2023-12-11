
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private mensagens : string = "";

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(message: string): void {
    this.mensagens = (message)
    this.socket.emit('message', this.mensagens);
  }

  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
}