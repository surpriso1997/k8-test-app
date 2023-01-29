import { NestMiddleware } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
import { Request, Response, NextFunction } from 'express';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    const { userId } = req.session || {};
    if (userId) {
      console.log(`user id in middleware is : ${userId}`);
      const user = await this.userService?.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
