import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('chart_board_API')
    .setDescription('로그인(JWT) / 게시글 CRUD / 목업 차트 API')
    .setVersion('1.0.0')
    .addBearerAuth() // Authorization 헤더 입력 지원
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📘 Swagger Docs: http://localhost:3000/api');
}
bootstrap();
