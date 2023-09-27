import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class CreateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
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
    next();
  }
}
