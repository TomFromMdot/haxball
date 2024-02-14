import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.headers.authorization) {
      return false;
    }

    ctx.user = await this.validateToken(ctx.headers.authorization);

    return true;
  }

  async validateToken(bearerToken: string) {
    const [type, token] = bearerToken.split(' ');

    if (type != 'Bearer')
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
