import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'json-to-pretty-yaml';

import { AppModule, Environment } from './app/app.module';
import { HttpExceptionFilter } from './common/infrastructure/api/filters/HttpExceptionFilter';
import { ValidationFilter } from './common/infrastructure/api/filters/ValidationFilter';
import { StringSanitizerInterceptor } from './common/infrastructure/api/interceptors/StringSanitizerInterceptor';
import type { ApplicationConfiguration } from './config/app.config';

process.on('unhandledRejection', error => {
  new Logger().error('unhandledRejection', { error });
});

process.on('uncaughtException', error => {
  new Logger().error('uncaughtException', { error });
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfigService: ApplicationConfiguration = app.get(ConfigService).get('app');

  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationFilter());

  app.useGlobalInterceptors(new StringSanitizerInterceptor());

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  if (appConfigService.env === Environment.LOCAL) {
    const config = new DocumentBuilder()
      .setTitle('Nodejs Starter API')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'Authorization')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    const data = YAML.stringify(document);
    fs.writeFile('swagger.yaml', data, err => {
      if (err) new Logger().log(err);
      else {
        new Logger().log('swagger.yaml file has been updated successfully\n');
      }
    });
  }

  await app.listen(appConfigService.port);
}

bootstrap();
