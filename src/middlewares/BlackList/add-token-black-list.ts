import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { decodeToken } from 'utils/decodeToken';
import { BlackList } from 'src/schemas/black.list.schema';
import { SessionUser } from 'src/schemas/session.user.schema';

@Injectable()
export class AddTokenMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(BlackList.name)
    private blackListModel: mongoose.Model<BlackList>,
    @InjectModel(SessionUser.name)
    private sessionUserModel: mongoose.Model<SessionUser>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headersToken = req.headers.authorization;
    const bodyToken = req.body.token;

    const executorToken = decodeToken(headersToken);
    const userToken = decodeToken(bodyToken);

    if (executorToken !== userToken) {
      throw new BadRequestException(
        'You do not have permission to add this token in black list',
      );
    }

    const token = await this.blackListModel.findOne({ token: bodyToken });

    if (token) {
      throw new BadRequestException('Token already exists in black list');
    }

    const sessionUser = await this.sessionUserModel.findOne({ token });

    if (!sessionUser) {
      throw new BadRequestException('Token not found in active sessions');
    }

    next();
  }
}
