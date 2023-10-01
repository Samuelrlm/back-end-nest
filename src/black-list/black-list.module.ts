import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BlackListService } from './black-list.service';
import { BlackListController } from './black-list.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlackListSchema } from 'src/schemas/black.list.schema';
import { AddTokenMiddleware } from 'src/middlewares/BlackList/add-token-black-list';
import { SessionUserSchema } from 'src/schemas/session.user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'BlackList', schema: BlackListSchema }]),
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
  ],
  providers: [BlackListService],
  controllers: [BlackListController],
})
export class BlackListModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddTokenMiddleware).forRoutes({
      path: 'black-list',
      method: RequestMethod.POST,
    });
  }
}
