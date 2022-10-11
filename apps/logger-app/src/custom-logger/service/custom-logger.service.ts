import { Injectable, Logger } from '@nestjs/common';
import { CustomLoggerRequestDto } from '../dto';
import { ICustomLoggerService } from './custom-logger.service.interface';

@Injectable()
export class CustomLoggerService
  extends Logger
  implements ICustomLoggerService
{
  public async log(data: CustomLoggerRequestDto): Promise<void> {
    super.log(data);
  }

  public async error(data: CustomLoggerRequestDto): Promise<void> {
    super.error(data);
  }

  public async warn(data: CustomLoggerRequestDto): Promise<void> {
    super.warn(data);
  }

  public async debug(data: CustomLoggerRequestDto): Promise<void> {
    super.debug(data);
  }
}
