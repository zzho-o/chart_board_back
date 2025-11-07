import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signJwt } from '../common/jwt.util';
import type { JwtPayload } from '../common/jwt.util';

@Injectable()
export class AuthService {
  private readonly dummyUser = {
    id: 'u_1',
    email: 'test@test.test',
    password: 'Test!234',
  } as const;

  login(email: string, password: string) {
    const user = this.dummyUser;

    if (email !== user.email || password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = signJwt(payload);

    return {
      token,
      user: { id: user.id, email: user.email },
    };
  }
}
