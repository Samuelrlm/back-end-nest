import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Completa de Usuários e Autenticação com NestJS e MongoDB')
    .setDescription(
      'API completa com sistema de autenticação JWT, CRUD de usuários, blacklist de tokens, Middlewares, Pipes, Guards, DTOs, Docker, MongoDB e muito mais!',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('session-user')
    .addTag('black-list')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4707);
}
bootstrap();
