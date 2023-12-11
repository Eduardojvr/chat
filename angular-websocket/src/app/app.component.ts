
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './socket.io.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>WebSocket Example (Angular 12)</h2>
      <button (click)="sendMessage()">Send Message</button>
      <p>{{ receivedMessage }}</p>
    </div>
  `,
})
export class AppComponent implements OnInit {
  receivedMessage: string | undefined;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.getMessage().subscribe((message) => {
      this.receivedMessage = message;
    });
  }

  sendMessage() {
    const message = prompt('Enter a message:');
    if (message) {
      this.websocketService.sendMessage(message);
    }
  }
}