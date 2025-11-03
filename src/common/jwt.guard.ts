import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJwt } from './jwt.util';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;
    if (!auth) throw new UnauthorizedException('Missing Authorization header');
    const token = auth.replace('Bearer ', '');
    const payload = verifyJwt(token);
    if (!payload) throw new UnauthorizedException('Invalid token');
    req.user = payload;
    return true;
  }
}
