import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { SessionUser } from '../../schemas/session.user.schema';
import { BlackList } from '../../schemas/black.list.schema';

@Injectable()
export class LogoutMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(SessionUser.name)
    private sessionUSerModel: mongoose.Model<SessionUser>,
    @InjectModel(BlackList.name)
    private blackListModel: mongoose.Model<BlackList>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;

    const session = await this.sessionUSerModel.findOne({
      token: token,
    });

    const blackList = await this.blackListModel.findOne({
      token: token,
    });

    if (blackList) {
      throw new UnauthorizedException('This session is already closed');
    }

    if (!session) {
      throw new UnauthorizedException('You are not logged in');
    }

    if (session) {
      await this.sessionUSerModel.deleteOne({ token });
      await this.blackListModel.create({ token });
    }

    next();
  }
}
