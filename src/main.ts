/* eslint-disable no-console */
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/infrastructure/api/filters/HttpExceptionFilter';
import { ValidationFilter } from './common/infrastructure/api/filters/ValidationFilter';
import { StringSanitizerInterceptor } from './common/infrastructure/api/interceptors/StringSanitizerInterceptor';
import { CorsAllowIoAdapter } from './common/infrastructure/gateway/AuthorizedIoAdapter';

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', { error });
});

process.on('uncaughtException', error => {
  console.error('uncaughtException', { error });
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationFilter());

  app.useGlobalInterceptors(new StringSanitizerInterceptor());

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useWebSocketAdapter(new CorsAllowIoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Nodejs Starter API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
