import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class GetUserByIdMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid id' });
    }
    if (!userId) {
      return res.status(400).send({ error: 'Id is required' });
    } else {
      const user = await this.userModel.findById(userId); // Consulta no banco de dados pelo ID

      if (!user) {
        throw new NotFoundException('User not found');
      }

      next();
    }
  }
}
