// server/src/messages/dto/update-delivery-status.dto.ts
import { IsBoolean, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateDeliveryStatusDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDelivered?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean
}
