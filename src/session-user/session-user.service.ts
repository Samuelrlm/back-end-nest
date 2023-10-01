import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionUser } from '../../src/schemas/session.user.schema';
import { LogoutDto } from './dto/logout.dto';

@Injectable()
export class SessionUserService {
  constructor(
    @InjectModel(SessionUser.name)
    private sessionUserModel: Model<SessionUser>,
  ) {}

  async getAllSessions(): Promise<SessionUser[]> {
    const sessions = await this.sessionUserModel.find();

    return sessions;
  }

  async logout(tokenDto: LogoutDto): Promise<any> {
    const { token } = tokenDto;

    if (!token) {
      throw new ForbiddenException('Token is required');
    }

    return { message: 'Logout success' };
  }
}
