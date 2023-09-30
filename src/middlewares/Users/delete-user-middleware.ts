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
import { User, permissionLevel } from '../../schemas/user.schema';
import { decodeToken } from 'utils/decodeToken';

@Injectable()
export class DeleteUserMidleWare implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id.toString();
    const headers = req.headers.authorization;
    const token = decodeToken(headers);

    const executorId = token.id;

    if (!executorId) {
      throw new BadRequestException('Executor id is required');
    }

    if (!mongoose.Types.ObjectId.isValid(executorId)) {
      throw new BadRequestException('Invalid executor id');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    if (id === executorId) {
      throw new BadRequestException('Cannot delete yourself');
    }

    if (!token) {
      throw new NotFoundException('Executor not found');
    }

    if (token.permissionLevel !== permissionLevel.ADMIN) {
      throw new ForbiddenException('Permission denied');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    next();
  }
}
