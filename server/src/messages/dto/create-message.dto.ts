import { IsNotEmpty, IsOptional, IsInt } from 'class-validator'

export class CreateMessageDto {
  @IsNotEmpty()
  content: string

  @IsInt()
  @IsNotEmpty()
  userID: number

  @IsInt()
  @IsNotEmpty()
  chatID: number

  @IsInt()
  @IsOptional()
  groupID?: number

  @IsInt()
  @IsNotEmpty()
  typeID: number // Assuming a default typeID if not provided
}
