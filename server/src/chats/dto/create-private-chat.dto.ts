import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'

export class CreatePrivateChatDto {
  @ApiProperty()
  @IsArray()
  participants: number[]
}
