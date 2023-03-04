import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { AppConfigs } from './AppConfigs';

@Injectable()
export class AppConfigService {
  readonly database: Readonly<{
    PORT: number;
    HOST: string;
    USER: string;
    PASSWORD: string;
    NAME: string;
  }>;

  readonly api: Readonly<{
    PORT: number;
  }>;

  constructor(private configService: ConfigService<AppConfigs, true>) {
    this.database = {
      PORT: this.configService.get('PG_PORT'),
      HOST: this.configService.get('PG_HOST'),
      USER: this.configService.get('PG_USER'),
      PASSWORD: this.configService.get('PG_PASSWORD'),
      NAME: this.configService.get('PG_DB_NAME'),
    };

    this.api = {
      PORT: this.configService.get('API_PORT'),
    };
  }
}
