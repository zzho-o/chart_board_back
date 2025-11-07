import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/auth.dto';
import { signJwt } from '../common/jwt.util';
import type { JwtPayload } from '../common/jwt.util';

@Injectable()
export class AuthService {
  private readonly dummyUser = {
    id: 'u_1',
    email: 'test@test.test',
    password: 'Test!234',
  } as const;

  login(dto: LoginRequestDto) {
    const { email, password } = dto;

    if (
      email !== this.dummyUser.email ||
      password !== this.dummyUser.password
    ) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const payload: JwtPayload = {
      id: this.dummyUser.id,
      email: this.dummyUser.email,
    };
    const token = signJwt(payload);

    return {
      token,
      user: { id: this.dummyUser.id, email: this.dummyUser.email },
    };
  }
}
