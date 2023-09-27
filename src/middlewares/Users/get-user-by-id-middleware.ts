import { NextFunction, Request, Response } from 'express';

export class GetUserByIdMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).send({ error: 'Id is required' });
    }
    next();
  }
}
