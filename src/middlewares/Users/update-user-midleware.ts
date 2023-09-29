import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, permissionLevel } from 'src/schemas/user.schema';

@Injectable()
export class UpdateUserMidleWare implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    const validFields = ['name', 'email', 'password', 'permissionLevel'];
    const invalidFields = Object.keys(req.body).filter(
      (field) => !validFields.includes(field),
    );

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid id' });
    }
    if (!userId) {
      return res.status(400).send({ error: 'Id is required' });
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
    if (req.body.password && typeof req.body.password !== 'string') {
      return res.status(400).send({ error: 'Password must be a string' });
    }
    if (
      req.body.permissionLevel &&
      !Object.values(permissionLevel).includes(req.body.permissionLevel)
    ) {
      return res.status(400).send({ error: 'Invalid permission level' });
    }
    if (req.body.email) {
      const email = req.body.email;

      const existingEmail = await this.userModel.findOne({
        email: email,
      });

      if (existingEmail) {
        return res.status(400).send({ error: 'Email already exists' });
      }
    }

    next();
  }
}
