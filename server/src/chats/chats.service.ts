import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateChatDto } from './dto/create-chat.dto'
import { CreateGroupChatDto } from './dto/create-group-chat.dto'
import { CreatePrivateChatDto } from './dto/create-private-chat.dto'
import { TypingIndicatorDto } from './dto/typing-indicator.dto'
import { ChatDto } from './dto/chat.dto'
import { ChatsGateway } from './chats.gateway'

@Injectable()
export class ChatsService {
  private prisma = new PrismaClient()

  constructor(private readonly chatsGateway: ChatsGateway) {}

  async createChat(createChatDto: CreateChatDto): Promise<ChatDto> {
    const chatName = createChatDto.name || 'New Chat'

    const chat = await this.prisma.chat.create({
      data: {
        name: chatName,
        receiveNotifications: true,
      },
    })

    if (createChatDto.participants && createChatDto.participants.length > 0) {
      for (const participantId of createChatDto.participants) {
        await this.prisma.userChat.create({
          data: {
            userID: participantId,
            chatID: chat.id,
          },
        })
      }
    }

    return {
      id: chat.id,
      name: chat.name,
      receiveNotifications: chat.receiveNotifications,
    }
  }

  async joinChat(chatId: number, userId: number): Promise<ChatDto> {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } })

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`)
    }

    await this.prisma.userChat.create({
      data: {
        userID: userId,
        chatID: chatId,
      },
    })

    return {
      id: chat.id,
      name: chat.name,
      receiveNotifications: chat.receiveNotifications,
    }
  }

  async leaveChat(chatId: number, userId: number): Promise<ChatDto> {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } })

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`)
    }

    await this.prisma.userChat.deleteMany({
      where: {
        userID: userId,
        chatID: chatId,
      },
    })

    return {
      id: chat.id,
      name: chat.name,
      receiveNotifications: chat.receiveNotifications,
    }
  }

  async createGroupChat(
    createGroupChatDto: CreateGroupChatDto,
  ): Promise<ChatDto> {
    const groupChat = await this.prisma.chat.create({
      data: {
        name: createGroupChatDto.name,
        receiveNotifications: true,
      },
    })

    for (const participantId of createGroupChatDto.participants) {
      await this.prisma.userChat.create({
        data: {
          userID: participantId,
          chatID: groupChat.id,
        },
      })
    }

    return {
      id: groupChat.id,
      name: groupChat.name,
      receiveNotifications: groupChat.receiveNotifications,
    }
  }

  async createPrivateChat(
    createPrivateChatDto: CreatePrivateChatDto,
  ): Promise<ChatDto> {
    const privateChat = await this.prisma.chat.create({
      data: {
        name: 'Private Chat',
        receiveNotifications: true,
      },
    })

    for (const participantId of createPrivateChatDto.participants) {
      await this.prisma.userChat.create({
        data: {
          userID: participantId,
          chatID: privateChat.id,
        },
      })
    }

    return {
      id: privateChat.id,
      name: privateChat.name,
      receiveNotifications: privateChat.receiveNotifications,
    }
  }

  async sendTypingIndicator(
    chatId: number,
    typingIndicatorDto: TypingIndicatorDto,
  ): Promise<void> {
    this.chatsGateway.handleTyping(
      { chatId, isTyping: typingIndicatorDto.isTyping },
      null,
    )
  }

  async getUserChats(userId: number): Promise<ChatDto[]> {
    const userChats = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userChats: {
          include: { chat: true },
        },
      },
    })

    return userChats.userChats.map((userChat) => ({
      id: userChat.chat.id,
      name: userChat.chat.name,
      receiveNotifications: userChat.chat.receiveNotifications,
    }))
  }

  async getUserGroups(userId: number): Promise<ChatDto[]> {
    const userGroups = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userGroups: {
          include: { group: true },
        },
      },
    })

    return userGroups.userGroups.map((userGroup) => ({
      id: userGroup.group.id,
      name: userGroup.group.name,
      receiveNotifications: userGroup.group.receiveNotifications,
    }))
  }
}
