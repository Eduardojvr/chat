
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './socket.io.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Chat dos monstros</h2>

     <p> <textarea style="width: 50%;"  (keyup.enter)="sendMessage()" [(ngModel)]="mensagemDigitada" placeholder="Digite algo"></textarea> </p>
      <button (click)="sendMessage()">Enviar mensagem</button>
      <li *ngFor="let valor of receivedMessage" >
        <p style="color: brown;">Anônimo disse: </p>
        <span>{{ valor }}</span>
      </li>
    </div>
  `,
})
export class AppComponent implements OnInit {
  receivedMessage: string[] = [];
  mensagemDigitada: string | undefined;
  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.getMessage().subscribe((message) => {
      this.receivedMessage.push(message);
    });
  }

  sendMessage() {
    if (this.mensagemDigitada !== undefined && this.mensagemDigitada !== "") {
      this.websocketService.sendMessage(this.mensagemDigitada);
      this.mensagemDigitada = "";
    }

  }
}