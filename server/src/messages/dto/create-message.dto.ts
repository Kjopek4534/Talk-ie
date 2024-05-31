// server/src/messages/dto/create-message.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  senderId: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  chatId?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  groupId?: number

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  typeId: number
}
