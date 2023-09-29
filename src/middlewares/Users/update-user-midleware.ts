import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, permissionLevel } from '../../schemas/user.schema';

@Injectable()
export class UpdateUserMidleWare implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const executorId = req.query.executorId as string;

    if (!executorId) {
      return res.status(400).send({ error: 'Missing executor id' });
    }

    if (!mongoose.Types.ObjectId.isValid(executorId)) {
      return res.status(400).send({ error: 'Invalid executor id' });
    }

    const validFields = ['name', 'email', 'permissionLevel'];
    const invalidFields = Object.keys(req.body).filter(
      (field) => !validFields.includes(field),
    );

    const existingId = await this.userModel.findById(userId);
    const existingExecutorId = await this.userModel.findById(executorId);

    if (!existingId) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (!existingExecutorId) {
      return res.status(404).send({ error: 'Executor not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid id' });
    }

    if (!userId) {
      return res.status(400).send({ error: 'Id is required' });
    }

    if (userId === executorId) {
      return res.status(400).send({ error: 'Cannot update yourself' });
    }

    if (existingExecutorId.permissionLevel < permissionLevel.EDITOR) {
      return res
        .status(403)
        .send({ error: 'You dont have permission for update user' });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: 'Body is required' });
    }
    if (invalidFields.length > 0) {
      return res
        .status(400)
        .send({ error: `Invalid fields: ${invalidFields.join(', ')}` });
    }
    if (req.body.name && typeof req.body.name !== 'string') {
      return res.status(400).send({ error: 'Name must be a string' });
    }
    if (req.body.email && typeof req.body.email !== 'string') {
      return res.status(400).send({ error: 'Email must be a string' });
    }
    if (
      req.body.permissionLevel &&
      !Object.values(permissionLevel).includes(req.body.permissionLevel)
    ) {
      return res.status(400).send({ error: 'Invalid permission level' });
    }

    next();
  }
}
