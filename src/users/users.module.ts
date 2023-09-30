import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { CreateUserMiddleware } from '../middlewares/Users/create-user-middleware';
import { GetUserByIdMiddleware } from '../middlewares/Users/get-user-by-id-middleware';
import { GetUserByEmailMiddleware } from '../middlewares/Users/get-user-by-email-midleware';
import { UpdateUserMidleWare } from '../middlewares/Users/update-user-midleware';
import { DeleteUserMidleWare } from '../middlewares/Users/delete-user-middleware';
import { AuthModule } from '../auth/auth.module';
import { UpdatePasswordMidleWare } from 'src/middlewares/Users/update-password-middleware';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
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

    consumer
      .apply(DeleteUserMidleWare)
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });

    consumer
      .apply(UpdatePasswordMidleWare)
      .forRoutes({ path: 'users/:id/password', method: RequestMethod.PATCH });
  }
}
