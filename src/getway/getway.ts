import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGetway {
  @WebSocketServer() server: Server;

  emitUserList(users: any[]) {
    this.server.emit('usersList', users);
  }

  handleConnection(client: any) {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: any) {
    console.log('client disconnected', client.id);
  }
}
