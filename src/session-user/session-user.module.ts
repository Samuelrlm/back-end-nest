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
import { LogoutMiddleware } from '../middlewares/SessionUser/logout-middleware';
import { MyGateway } from 'src/getway/gateway';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
    MongooseModule.forFeature([{ name: 'BlackList', schema: BlackListSchema }]),
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
  ],
  providers: [SessionUserService, MyGateway],
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

    consumer
      .apply(LogoutMiddleware)
      .forRoutes({ path: 'session-user/logout', method: RequestMethod.POST });
  }
}
