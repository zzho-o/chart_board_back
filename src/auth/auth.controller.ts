import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 (JWT 발급)' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ status: 201, type: LoginResponseDto })
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }
}
