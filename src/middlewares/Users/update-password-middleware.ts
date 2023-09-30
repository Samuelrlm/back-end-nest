import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, permissionLevel } from '../../schemas/user.schema';
import { decodeToken } from 'utils/decodeToken';

@Injectable()
export class UpdatePasswordMidleWare implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const infosFromHearder = req.headers.authorization;
    const token = decodeToken(infosFromHearder);

    if (token.permissionLevel <= permissionLevel.EDITOR) {
      throw new BadRequestException('You dont have permission for update user');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid id');
    }

    if (!userId) {
      throw new BadRequestException('Id is required');
    }

    if (Object.keys(req.body).length === 0) {
      throw new BadRequestException('Body is required');
    }

    const validFields = ['password'];

    const invalidFields = Object.keys(req.body).filter(
      (field) => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(`Invalid fields: ${invalidFields}`);
    }

    next();
  }
}
