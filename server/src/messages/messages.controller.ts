// src/messages/messages.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
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
  async findAllForChat(@Param('chatId') chatId: number) {
    return this.messagesService.findAllMessagesForChat(chatId)
  }

  @Get('group/:groupId')
  async findAllForGroup(@Param('groupId') groupId: number) {
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
