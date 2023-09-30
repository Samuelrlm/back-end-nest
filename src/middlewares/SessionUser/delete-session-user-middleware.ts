import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { decodeToken } from 'utils/decodeToken';
import { SessionUser } from 'src/schemas/session.user.schema';

@Injectable()
export class DeleteSessionUserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(SessionUser.name)
    private sessionUserModel: mongoose.Model<SessionUser>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const headers = req.headers.authorization;
    const token = decodeToken(headers);

    const executorId = token.id;

    if (!executorId) {
      throw new BadRequestException('Executor id is required');
    }

    if (!mongoose.Types.ObjectId.isValid(executorId)) {
      throw new BadRequestException('Invalid executor id');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid id');
    }
    if (!userId) {
      throw new BadRequestException('Id is required');
    }

    const user = await this.sessionUserModel.findOne({ userId });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (userId !== executorId) {
      throw new ForbiddenException(
        'You do not have permission to delete this session',
      );
    }

    if (!token) {
      throw new NotFoundException('Executor not found');
    }

    next();
  }
}
