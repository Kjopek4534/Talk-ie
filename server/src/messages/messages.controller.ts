// src/messages/messages.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto'
import { AuthGuard } from '../auth/auth.guard'

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto)
  }

  @Get('chats/:chatId')
  async getMessagesForChat(@Param('chatId') chatId: string) {
    const parsedChatId = parseInt(chatId, 10)
    return this.messagesService.findAllMessagesForChat(parsedChatId)
  }

  @Get('groups/:groupId')
  async getMessagesForGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.messagesService.findAllMessagesForGroup(groupId)
  }

  @Patch(':id')
  async updateDeliveryStatus(
    @Param('id') id: number,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    return this.messagesService.updateDeliveryStatus(
      id,
      updateDeliveryStatusDto,
    )
  }
}
