import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from '@nestjs/common'

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}))

describe('AuthService', () => {
  let service: AuthService
  let usersService: any
  let jwtService: any

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
      create: jest.fn(),
    }
    jwtService = {
      signAsync: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('signIn', () => {
    it('should return a JWT when credentials are valid', async () => {
      const user = { userId: 1, username: 'test', password: 'hashedpassword' }
      usersService.findOne.mockResolvedValue(user)
      jwtService.signAsync.mockResolvedValue('testToken')
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      const result = await service.signIn('test', 'testpassword')

      expect(result).toEqual({ access_token: 'testToken' })
    })

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const user = { userId: 1, username: 'test', password: 'hashedpassword' }
      usersService.findOne.mockResolvedValue(user)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      await expect(service.signIn('test', 'wrongpassword')).rejects.toThrow(
        UnauthorizedException,
      )
    })
  })

  describe('signUp', () => {
    it('should create a new user and return the created user', async () => {
      const user = {
        username: 'test',
        email: 'test@test.com',
        password: 'testpassword',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const createdUser = { ...user, id: 1 }
      usersService.create.mockResolvedValue(createdUser)
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword')

      const result = await service.signUp(user)

      expect(result).toEqual(createdUser)
    })
  })
})
