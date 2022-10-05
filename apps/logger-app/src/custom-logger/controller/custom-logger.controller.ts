import { Controller } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CustomLoggerRequestDto } from '../dto';
import { CustomLoggerService } from '../service';

@Controller('custom-logger')
export class CustomLoggerController {
  constructor(private readonly loggerService: CustomLoggerService) {}

  @EventPattern('log')
  public async log(data: CustomLoggerRequestDto): Promise<void> {
    try {
      await this.loggerService.log(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('error')
  public async error(data: CustomLoggerRequestDto): Promise<void> {
    try {
      await this.loggerService.error(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('warn')
  public async warn(data: CustomLoggerRequestDto): Promise<void> {
    try {
      await this.loggerService.warn(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('debug')
  public async debug(data: CustomLoggerRequestDto): Promise<void> {
    try {
      await this.loggerService.debug(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
