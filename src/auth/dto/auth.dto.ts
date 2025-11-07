import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'test@test.test', description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test!234', description: '비밀번호 (8자 이상)' })
  @IsString()
  @MinLength(4)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT 토큰',
  })
  token: string;

  @ApiProperty({
    example: { id: 'u_1', email: 'test@test.test' },
    description: '로그인한 사용자 정보',
  })
  user: {
    id: string;
    email: string;
  };
}
