import { CustomLoggerRequestDto } from '../dto';

export interface ICustomLoggerService {
  log(data: CustomLoggerRequestDto): Promise<void>;

  error(data: CustomLoggerRequestDto): Promise<void>;

  warn(data: CustomLoggerRequestDto): Promise<void>;

  debug(data: CustomLoggerRequestDto): Promise<void>;
}
