import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import {Observable} from 'rxjs';
import {ProduceMessageDto} from '../models/produce-message-dto';
import {environment} from '../../environments/environment';
import SockJS from 'sockjs-client/dist/sockjs';

@Injectable()
export class WebsocketService {

  private readonly topicMessage = '/topic/message';
  private websocket: SockJS;
  public connected: boolean = false;

  public connect(): Observable<ProduceMessageDto> {

    if (environment?.production) {
      this.websocket = Stomp.over(new SockJS('/WEBSOCKET/ws'));
    } else {
      this.websocket = Stomp.over(new SockJS('/ws'));
    }
    return new Observable(observer => {
      this.websocket.connect({}, () => {
        console.log('Connected!');
        this.connected = true;
        this.websocket.subscribe(this.topicMessage, (message: { body: string }) => {
          const json = JSON.parse(message.body);
          observer.next(json as ProduceMessageDto);
        });
      });
    });
  }

  public disconnect() {
    this.connected = false;
    console.log('Disconnected!');
    this.websocket.disconnect();
  }
}
