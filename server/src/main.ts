// server/src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS using NestJS built-in method
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  // Use helmet for security
  app.use(helmet())

  await app.listen(5000)
}
bootstrap()
