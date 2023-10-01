import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { BlackList } from 'src/schemas/black.list.schema';

@Injectable()
export class BlackListMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(BlackList.name)
    private blackListModel: mongoose.Model<BlackList>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization;
    const token = headers.split(' ')[1];

    const blackList = await this.blackListModel.findOne({ token });

    if (blackList) {
      throw new ForbiddenException('Token is black listed');
    }

    next();
  }
}