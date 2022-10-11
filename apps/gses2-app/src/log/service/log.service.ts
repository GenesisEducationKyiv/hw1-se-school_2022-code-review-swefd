import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LogService extends ConsoleLogger {
  constructor(
    @Inject('RATE_PROVIDERS_RMQ') private readonly client: ClientProxy,
  ) {
    super();
  }

  log(message: any, ...optionalParams) {
    this.client.emit('log', message);
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams) {
    this.client.emit('error', message);
    super.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams) {
    this.client.emit('warn', message);
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams) {
    this.client.emit('debug', message);
    super.debug(message, ...optionalParams);
  }
}
