import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsArray } from 'class-validator'

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  type: 'group' | 'private'

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  participants?: number[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string
}
