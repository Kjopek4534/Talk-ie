import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessagesService } from './messages.service'

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server

  constructor(private readonly messagesService: MessagesService) {}

  afterInit() {
    console.log('WebSocket initialized')
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id)
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.createMessage(createMessageDto)

    if (createMessageDto.chatID) {
      this.server.to(`chat_${createMessageDto.chatID}`).emit('message', message)
    } else if (createMessageDto.groupID) {
      this.server
        .to(`group_${createMessageDto.groupID}`)
        .emit('message', message)
    }
  }
}
