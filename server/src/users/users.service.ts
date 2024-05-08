import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export type User = any

const prisma = new PrismaClient()

@Injectable()
export class UsersService {
  async findOne(user: string): Promise<User | undefined> {
    return prisma.user.findUnique({
      where: {
        username: `${user}`,
      },
    })
  }
}
