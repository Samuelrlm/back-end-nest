import { InjectModel } from '@nestjs/mongoose';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import { User } from 'src/schemas/user.schema';

@WebSocketGateway()
export class MyGateway {
  @WebSocketServer() server: Server;

  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  private users: any[] = [];

  emitUserList(users: any[]) {
    this.server.emit('usersList', users);
  }

  emitSesionUserList(users: any[]) {
    this.server.emit('sessionUsersList', users);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const usersList = this.userModel.find();

    usersList.then((users) => {
      this.users = users;
      this.emitUserList(this.users);
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
