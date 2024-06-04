import { Module } from '@nestjs/common'
import {
  ChatsController,
  GroupChatsController,
  PrivateChatsController,
  UsersController,
} from './chats.controller'
import { ChatsService } from './chats.service'
import { ChatsGateway } from './chats.gateway'

@Module({
  controllers: [
    ChatsController,
    GroupChatsController,
    PrivateChatsController,
    UsersController,
  ],
  providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
