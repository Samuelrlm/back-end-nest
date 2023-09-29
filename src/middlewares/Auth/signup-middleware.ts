import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SignUpMidleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const existingEmail = await this.userModel.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    next();
  }
}
