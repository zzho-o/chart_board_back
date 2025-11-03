import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MockModule } from './mock/mock.module';

@Module({
  imports: [AuthModule, PostsModule, MockModule],
})
export class AppModule {}
