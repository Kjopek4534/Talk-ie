import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { TypingIndicatorDto } from './dto/typing-indicator.dto'

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() typingIndicatorDto: TypingIndicatorDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const { chatId, isTyping } = typingIndicatorDto
    client.to(`chat_${chatId}`).emit('typing', { chatId, isTyping })
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(`chat_${chatId}`)
  }

  @SubscribeMessage('leaveChat')
  handleLeaveChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(`chat_${chatId}`)
  }
}
