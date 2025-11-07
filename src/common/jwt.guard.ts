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
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) throw new UnauthorizedException();

    const token = auth.replace('Bearer ', '');
    try {
      const decoded = verifyJwt(token);
      req.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
