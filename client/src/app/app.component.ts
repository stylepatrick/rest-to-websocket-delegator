import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {WebsocketService} from "./services/websocket.service";
import {ProduceMessageDto} from "./models/produce-message-dto";

@Component({
  selector: 'app-root',
  template: `
    <p-toast></p-toast>
    <h1>Hello rest-to-websocket-delegator!</h1>
    <div style="padding: 1em">
      <div class="grid">
        <span class="p-float-label">
            <input type="text" id="userId" pInputText [(ngModel)]="userId"/>
            <label for="userId">User-Id</label>
        </span>
        <p-button icon="pi pi-sign-in" class="m-1"
                  [disabled]="websocketService.connected || !userId"
                  (onClick)="connect()"
        ></p-button>
        <p-button icon="pi pi-sign-out" class="m-1"
                  [disabled]="!websocketService.connected"
                  (onClick)="disconnect()"
        ></p-button>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th><h3>Received:</h3></th>
      </tr>
      </thead>
      <tbody *ngFor="let message of received">
      <tr>
        <td>
          <b>
            {{message.uuid}} -> {{message.time | date: 'dd.MM.yyyy hh:mm:ss'}} -> {{message.message}}
          </b>
        </td>
      </tr>
      </tbody>
    </table>
  `
})
export class AppComponent {

  userId: string;
  received: ProduceMessageDto[] = [];

  constructor(
    public websocketService: WebsocketService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  connect() {
    this.websocketService.connect().subscribe(producedMessageDto => {
      if (this.userId === producedMessageDto.userId) {
        this.received.push(producedMessageDto);
        this.messageService.add({severity: 'info', summary: 'New message!', detail: producedMessageDto.message});
      }
    });
  }

  disconnect() {
    if (this.websocketService.connected) {
      this.received = [];
      this.userId = null;
      this.websocketService.disconnect();
    }
  }
}
