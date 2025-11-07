import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(''); // 루트 경로 그대로

  const config = new DocumentBuilder()
    .setTitle('FE Hiring REST API')
    .setDescription('로그인(JWT) / 게시글 / Mock Charts API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
  console.log(`📘 Swagger: http://localhost:3000/api`);
}
bootstrap();
