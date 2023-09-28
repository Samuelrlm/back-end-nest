import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CreateUserMiddleware } from 'src/middlewares/Users/create-user-middleware';
import { GetUserByIdMiddleware } from 'src/middlewares/Users/get-user-by-id-middleware';
import { GetUserByEmailMiddleware } from 'src/middlewares/Users/get-user-by-email-midleware';
import { UpdateUserMidleWare } from 'src/middlewares/Users/update-user-midleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateUserMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });

    consumer
      .apply(GetUserByIdMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.GET });

    consumer
      .apply(GetUserByEmailMiddleware)
      .forRoutes({ path: 'users/email/:email', method: RequestMethod.GET });

    consumer
      .apply(UpdateUserMidleWare)
      .forRoutes({ path: 'users/:id', method: RequestMethod.PUT });
  }
}
