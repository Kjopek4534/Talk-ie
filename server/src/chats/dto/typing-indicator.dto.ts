import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber } from 'class-validator'

export class TypingIndicatorDto {
  @ApiProperty()
  @IsBoolean()
  isTyping: boolean

  @ApiProperty()
  @IsNumber()
  chatId: number
}
