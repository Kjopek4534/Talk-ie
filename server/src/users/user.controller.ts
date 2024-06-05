import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    return this.usersService.findAll()
  }

  @Get('me')
  async getMe(@Req() request: any) {
    const userId = request.user.sub
    return this.usersService.findById(userId)
  }
}
