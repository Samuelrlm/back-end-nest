import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SessionUserService } from './session-user.service';
import { SessionUserController } from './session-user.controller';
import { AuthModule } from '../../src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionUserSchema } from '../../src/schemas/session.user.schema';
import { DeleteSessionUserMiddleware } from '../../src/middlewares/SessionUser/delete-session-user-middleware';
import { BlackListSchema } from '../../src/schemas/black.list.schema';
import { BlackListMiddleware } from '../../src/middlewares/black-list-middleware';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
    MongooseModule.forFeature([{ name: 'BlackList', schema: BlackListSchema }]),
  ],
  providers: [SessionUserService],
  controllers: [SessionUserController],
})
export class SessionUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeleteSessionUserMiddleware).forRoutes({
      path: 'session-user/:userId',
      method: RequestMethod.DELETE,
    });

    consumer
      .apply(BlackListMiddleware)
      .forRoutes({ path: 'session-user', method: RequestMethod.ALL });
  }
}
