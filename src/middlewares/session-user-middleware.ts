import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { SessionUser } from 'src/schemas/session.user.schema';

@Injectable()
export class SessionUserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(SessionUser.name)
    private sessionUserModel: mongoose.Model<SessionUser>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization;
    const token = headers.split(' ')[1];

    console.log('opa');

    const session = await this.sessionUserModel.findOne({ token });

    if (!session) {
      throw new ForbiddenException('Session not found');
    }

    next();
  }
}
