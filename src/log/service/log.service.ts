import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LogService extends ConsoleLogger {
  log(message: any, ...optionalParams) {
    super.log(message, ...optionalParams);
  }
}
