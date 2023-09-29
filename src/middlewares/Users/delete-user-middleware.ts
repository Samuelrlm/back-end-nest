import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, permissionLevel } from '../../schemas/user.schema';

@Injectable()
export class DeleteUserMidleWare implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id.toString();
    const executorId = req.query.executorId as string;

    if (!executorId) {
      return res.status(400).send({ message: 'Missing executor id' });
    }

    if (!mongoose.Types.ObjectId.isValid(executorId)) {
      return res.status(400).send({ message: 'Invalid executor id' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid id' });
    }
    if (!id) {
      return res.status(400).send({ message: 'Missing id' });
    }

    if (id === executorId) {
      return res.status(400).send({ message: 'Cannot delete yourself' });
    }

    const executor = await this.userModel.findById(executorId);
    if (!executor) {
      throw new NotFoundException('Executor not found');
    }

    if (executor.permissionLevel !== permissionLevel.ADMIN) {
      return res
        .status(403)
        .send({ message: 'Permission denied. Only admin can delete user' });
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    next();
  }
}
