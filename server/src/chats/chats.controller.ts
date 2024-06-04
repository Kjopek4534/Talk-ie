import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common'
import { ChatsService } from './chats.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { CreateGroupChatDto } from './dto/create-group-chat.dto'
import { CreatePrivateChatDto } from './dto/create-private-chat.dto'
import { TypingIndicatorDto } from './dto/typing-indicator.dto'
import { AuthGuard } from '../auth/auth.guard'
import { ChatDto } from './dto/chat.dto'

@Controller('chats')
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto): Promise<ChatDto> {
    return this.chatsService.createChat(createChatDto)
  }

  @Post(':id/join')
  async joinChat(
    @Param('id') chatId: number,
    @Body('userId') userId: number,
  ): Promise<ChatDto> {
    return this.chatsService.joinChat(chatId, userId)
  }

  @Post(':id/leave')
  async leaveChat(
    @Param('id') chatId: number,
    @Body('userId') userId: number,
  ): Promise<ChatDto> {
    return this.chatsService.leaveChat(chatId, userId)
  }

  @Post(':id/typing')
  async sendTypingIndicator(
    @Param('id') chatId: number,
    @Body() typingIndicatorDto: TypingIndicatorDto,
  ): Promise<void> {
    return this.chatsService.sendTypingIndicator(chatId, typingIndicatorDto)
  }
}

@Controller('group-chats')
@UseGuards(AuthGuard)
export class GroupChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createGroupChat(
    @Body() createGroupChatDto: CreateGroupChatDto,
  ): Promise<ChatDto> {
    return this.chatsService.createGroupChat(createGroupChatDto)
  }
}

@Controller('private-chats')
@UseGuards(AuthGuard)
export class PrivateChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createPrivateChat(
    @Body() createPrivateChatDto: CreatePrivateChatDto,
  ): Promise<ChatDto> {
    return this.chatsService.createPrivateChat(createPrivateChatDto)
  }
}

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':userId/chats')
  async getUserChats(@Param('userId') userId: number): Promise<ChatDto[]> {
    return this.chatsService.getUserChats(userId)
  }

  @Get(':userId/groups')
  async getUserGroups(@Param('userId') userId: number): Promise<ChatDto[]> {
    return this.chatsService.getUserGroups(userId)
  }
}
