import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class GetUserByEmailMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userEmail = req.params.email;

    if (!userEmail) {
      return res.status(400).send({ error: 'Email is required' });
    } else {
      const user = await this.userModel.findOne({ email: userEmail });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      next();
    }
  }
}
