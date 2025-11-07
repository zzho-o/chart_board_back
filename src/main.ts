import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'swagger-ui-dist'));

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('ChartBoard API')
    .setDescription('게시판 + 차트 + 인증 데모 백엔드')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Swagger ready → https://chart-board-back.vercel.app/docs`);
}

bootstrap();
