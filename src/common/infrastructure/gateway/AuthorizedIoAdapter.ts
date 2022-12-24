import { IoAdapter } from '@nestjs/platform-socket.io';
import type { ServerOptions } from 'socket.io';

export class CorsAllowIoAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    }
  ): any {
    const server = super.createIOServer(port, { ...options, cors: true });

    return server;
  }
}
