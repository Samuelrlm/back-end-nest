import { Module } from '@nestjs/common';
import { SessionUserService } from './session-user.service';
import { SessionUserController } from './session-user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionUserSchema } from 'src/schemas/session.user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
  ],
  providers: [SessionUserService],
  controllers: [SessionUserController],
})
export class SessionUserModule {}
