import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

const saltOrRounds: number = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)

    const isMatch = await bcrypt.compare(pass, user?.password)
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    const { password, ...result } = user
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result
  }
}
