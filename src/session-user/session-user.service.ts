import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionUser } from 'src/schemas/session.user.schema';

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
}
