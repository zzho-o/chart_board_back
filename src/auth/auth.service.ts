import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signJwt } from '../common/jwt.util';

@Injectable()
export class AuthService {
  private readonly dummyUser = {
    id: 'u_1',
    email: 'test@test.test',
    password: 'Test!234',
  };

  login(email: string, password: string) {
    const { dummyUser } = this;
    if (email !== dummyUser.email || password !== dummyUser.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = signJwt({ id: dummyUser.id, email: dummyUser.email });
    return { token, user: { id: dummyUser.id, email: dummyUser.email } };
  }
}
