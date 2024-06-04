import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsArray } from 'class-validator'

export class CreateGroupChatDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsArray()
  participants: number[]
}
