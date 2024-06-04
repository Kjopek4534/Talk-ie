// server/src/messages/messages.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto'

@Injectable()
export class MessagesService {
  private prisma = new PrismaClient()

  async createMessage(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        userID: createMessageDto.senderId,
        chatID: createMessageDto.chatId,
        groupID: createMessageDto.groupId,
        typeID: createMessageDto.typeId,
      },
    })
  }

  async findAllMessagesForChat(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatID: chatId },
      orderBy: {
        sentAt: 'asc',
      },
    })
  }

  async findAllMessagesForGroup(groupId: number) {
    return this.prisma.message.findMany({
      where: { groupID: groupId },
      orderBy: {
        sentAt: 'asc',
      },
    })
  }

  async updateDeliveryStatus(
    id: number,
    updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    return this.prisma.message.update({
      where: { id },
      data: {
        deliveredAt: updateDeliveryStatusDto.isDelivered
          ? new Date()
          : undefined,
        seenAt: updateDeliveryStatusDto.isRead ? new Date() : undefined,
      },
    })
  }
}
