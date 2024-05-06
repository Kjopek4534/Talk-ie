import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export type User = any

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return prisma.user.findUnique({
      where: {
        username: username,
      },
    })
  }
}
