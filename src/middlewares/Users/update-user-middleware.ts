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
import { decodeToken } from '../../../utils/decodeToken';

@Injectable()
export class UpdateUserMidleWare implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const headers = req.headers.authorization;
    const token = decodeToken(headers);

    if (!mongoose.Types.ObjectId.isValid(token.id)) {
      return res.status(400).send({ error: 'Invalid executor id' });
    }

    const validFields = ['name', 'email', 'permissionLevel'];
    const invalidFields = Object.keys(req.body).filter(
      (field) => !validFields.includes(field),
    );

    const existingId = await this.userModel.findById(userId);
    const existingExecutorId = await this.userModel.findById(token.id);

    if (!existingId) {
      throw new NotFoundException('User not found');
    }

    if (!existingExecutorId) {
      throw new NotFoundException('Executor not found');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid id');
    }

    if (!userId) {
      throw new BadRequestException('Id is required');
    }

    if (userId === token.id) {
      throw new BadRequestException('Cannot update yourself');
    }

    if (existingExecutorId.permissionLevel < permissionLevel.EDITOR) {
      throw new ForbiddenException('You dont have permission for update user');
    }

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields: ${invalidFields.join(', ')}`,
      );
    }

    if (
      req.body.permissionLevel &&
      existingExecutorId.permissionLevel < permissionLevel.ADMIN
    ) {
      throw new ForbiddenException('Permission denied');
    }

    next();
  }
}
