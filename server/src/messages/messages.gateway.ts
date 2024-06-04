// server/src/messages/messages.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto'

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer() server: Server

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.createMessage(createMessageDto)
    if (createMessageDto.chatId) {
      this.server
        .to(`chat_${createMessageDto.chatId}`)
        .emit('receiveMessage', message)
    } else if (createMessageDto.groupId) {
      this.server
        .to(`group_${createMessageDto.groupId}`)
        .emit('receiveMessage', message)
    }
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: any, chatId: number) {
    client.join(`chat_${chatId}`)
  }

  @SubscribeMessage('joinGroup')
  handleJoinGroup(client: any, groupId: number) {
    client.join(`group_${groupId}`)
  }

  @SubscribeMessage('updateDeliveryStatus')
  async handleUpdateDeliveryStatus(
    @MessageBody() data: { id: number; status: UpdateDeliveryStatusDto },
  ) {
    const message = await this.messagesService.updateDeliveryStatus(
      data.id,
      data.status,
    )
    this.server.emit('messageUpdated', message)
  }
}
