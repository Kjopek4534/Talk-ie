import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { BaseUser } from '../users/dto/base-user.dto'

@Injectable()
export class AuthService {
  saltOrRounds: number = 10
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username)
    const isMatch = await bcrypt.compare(pass, user?.password)

    if (!isMatch) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.username } // Ensure user.id is used here
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signUp(payload: BaseUser) {
    const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds)

    const data = {
      ...payload,
      password: hashPass,
    }

    return await this.usersService.create(data)
  }
}
