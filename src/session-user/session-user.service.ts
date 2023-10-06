import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionUser } from '../../src/schemas/session.user.schema';
import { LogoutDto } from './dto/logout.dto';
import { MyGateway } from '../getway/gateway';

@Injectable()
export class SessionUserService {
  constructor(
    @InjectModel(SessionUser.name)
    private sessionUserModel: Model<SessionUser>,
    private readonly myGateway: MyGateway,
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

    const sessions = await this.sessionUserModel.find();

    this.myGateway.emitSesionUserList(sessions);

    return { message: 'Logout success' };
  }
}
