import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IncomingMessage } from 'http';
import type { JwtPayload } from 'jsonwebtoken';

import { IGlobalDBContext } from '../../../application/IGlobalDBContext';
import { BaseToken } from '../../../diTokens';
import type { RequestExtended } from '../RequestExtended';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(BaseToken.GLOBAL_DB_CONTEXT) private dbContext: IGlobalDBContext) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestExtended>();

    const jwtToken = JwtAuthGuard.parseTokenFromHeaders(req);

    const jwt = new JwtService({ secret: process.env.JWT_SECRET });

    const decodedData = jwt.verify<JwtPayload>(jwtToken);

    const user = await this.dbContext.userRepository.findById(decodedData.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = {
      id: user.id,
    };

    return true;
  }

  private static parseTokenFromHeaders(req: IncomingMessage): string {
    const [, jwtToken] = req.headers.authorization?.split(' ') || [];

    return jwtToken;
  }
}
