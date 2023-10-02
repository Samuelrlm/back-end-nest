import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpMidleware } from '../middlewares/Auth/signup-middleware';
import { LoginMidleware } from '../middlewares/Auth/login-middleware';
import { JwtStrategy } from './jwt.strategy';
import { SessionUserSchema } from '../../src/schemas/session.user.schema';
import { BlackListSchema } from '../../src/schemas/black.list.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
    MongooseModule.forFeature([{ name: 'BlackList', schema: BlackListSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignUpMidleware)
      .forRoutes({ path: 'auth/signup', method: RequestMethod.POST });

    consumer
      .apply(LoginMidleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
