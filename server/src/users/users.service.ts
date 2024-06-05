import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { BaseUser } from './dto/base-user.dto'

export type User = any

const prisma = new PrismaClient()

@Injectable()
export class UsersService {
  async create(payload: BaseUser): Promise<User | undefined> {
    return prisma.user.create({
      data: {
        username: `${payload.username}`,
        email: `${payload.email}`,
        password: `${payload.password}`,
        createdAt: `${payload.createdAt}`,
        updatedAt: `${payload.updatedAt}`,
      },
    })
  }
  async findOne(user: string): Promise<User | undefined> {
    return prisma.user.findUnique({
      where: {
        username: `${user}`,
      },
    })
  }

  async findById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async findAll() {
    return prisma.user.findMany()
  }
}
