import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // enable log
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  // route global prefix
  app.setGlobalPrefix('api');

  // Enable Cors
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:8080',
  });

  //setup swagger module
  const config = new DocumentBuilder()
    .setTitle('Gestão de frotas')
    .setDescription('API para realizar a gestão de frotas de veículos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //enable class validators
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
