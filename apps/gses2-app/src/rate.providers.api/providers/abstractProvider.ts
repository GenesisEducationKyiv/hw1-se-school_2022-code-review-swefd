import { ICurrencyProvider } from './interfaces';
import { CurrencyPairDto, RateResponseDto } from '../dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

export abstract class AbstractProvider implements ICurrencyProvider {
  nextHandler: ICurrencyProvider;
  protected url;

  protected constructor(protected httpService: HttpService) {}

  public setNext(handler: ICurrencyProvider): ICurrencyProvider {
    this.nextHandler = handler;
    return handler;
  }

  async getRate(currencyPair: CurrencyPairDto): Promise<RateResponseDto> {
    this.url = this.buildUrl(this.url, currencyPair);

    try {
      const data = this.httpService
        .get(this.url)
        .pipe(map((response) => response.data));

      const response = await lastValueFrom(data);

      return this.parseRate(currencyPair, response);
    } catch (error) {
      return this.nextHandler.getRate(currencyPair);
    }
  }

  abstract buildUrl(url: string, currencyPair): string;

  abstract parseRate(
    currencyPair: CurrencyPairDto,
    response: any,
  ): RateResponseDto;
}
