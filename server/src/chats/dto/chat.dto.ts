import { ApiProperty } from '@nestjs/swagger'

export class ChatDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  receiveNotifications: boolean
}
