import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, permissionLevel } from 'src/users/schemas/user.schema';

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.body.name) {
      return res.status(400).send({ error: 'Name is required' });
    }
    if (!req.body.email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if (!req.body.password) {
      return res.status(400).send({ error: 'Password is required' });
    }
    if (!req.body.permissionLevel) {
      return res.status(400).send({ error: 'Permission level is required' });
    }
    if (!Object.values(permissionLevel).includes(req.body.permissionLevel)) {
      return res.status(400).send({ error: 'Invalid permission level' });
    }

    const existingEmail = await this.userModel.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    next();
  }
}
