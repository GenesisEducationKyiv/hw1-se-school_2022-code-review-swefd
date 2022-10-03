import { Inject } from '@nestjs/common';
import { LogService } from './log.service';

export function logDecorator(enable = true, bubble = true) {
  const injectLogger = Inject(LogService);

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    injectLogger(target, 'logger');

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        if (enable) {
          const logger: LogService = this.logger;
          logger.setContext(target.constructor.name);

          if (result instanceof Object) {
            logger.log(JSON.stringify(result));
          } else {
            logger.log(result);
          }
        }

        return result;
      } catch (error) {
        const logger: LogService = this.logger;

        logger.setContext(target.constructor.name);
        logger.error(error.message, error.stack);

        if (bubble) {
          throw error;
        }
      }
    };
  };
}
