import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './user.controller'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
