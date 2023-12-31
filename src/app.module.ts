import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SessionUserModule } from './session-user/session-user.module';
import { BlackListModule } from './black-list/black-list.module';
import { GetwayModule } from './getway/getway.module';

@Module({
  imports: [
    GetwayModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    AuthModule,
    SessionUserModule,
    BlackListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
