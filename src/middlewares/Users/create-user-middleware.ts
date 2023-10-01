import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, permissionLevel } from '../../schemas/user.schema';
import { decodeToken } from '../../../utils/decodeToken';

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization;
    const token = decodeToken(headers);

    if (!Object.values(permissionLevel).includes(req.body.permissionLevel)) {
      throw new BadRequestException('Invalid permission level');
    }

    const existingEmail = await this.userModel.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    if (!mongoose.Types.ObjectId.isValid(token.id)) {
      throw new BadRequestException('Invalid executor id');
    }

    const createdBy = await this.userModel.findById(token.id);

    if (!createdBy) {
      throw new BadRequestException('Created by not found');
    }

    if (token.permissionLevel !== permissionLevel.ADMIN) {
      throw new ForbiddenException(
        'Permission denied. Only admin can create user',
      );
    }

    req.body.password = '123456';
    req.body.createdBy = token.id;

    next();
  }
}
