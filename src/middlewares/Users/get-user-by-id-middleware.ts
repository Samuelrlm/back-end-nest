import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../../schemas/user.schema';
@Injectable()
export class GetUserByIdMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid id');
    }
    if (!userId) {
      throw new BadRequestException('Id is required');
    } else {
      const user = await this.userModel.findById(userId); // Consulta no banco de dados pelo ID

      if (!user) {
        throw new NotFoundException('User not found');
      }

      next();
    }
  }
}
