import { Controller, Get } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MockModule } from './mock/mock.module';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health Check' })
  getHealth() {
    return { ok: true };
  }
}

@Module({
  imports: [AuthModule, PostsModule, MockModule],
  controllers: [HealthController],
})
export class AppModule {}
