import { ICurrencyProvider } from './interfaces';
import { CurrencyPairDto, RateResponseDto } from '../dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export abstract class AbstractProvider implements ICurrencyProvider {
  nextHandler: ICurrencyProvider;
  protected url;
  protected constructor(
    protected httpService: HttpService,
    @Inject('RATE_PROVIDERS_RMQ') protected readonly client: ClientProxy,
  ) {}

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

      const rate = this.parseRate(currencyPair, response);

      //this.client.emit('log', response);

      return rate;
    } catch (error) {
      console.log(error);
      return this.nextHandler.getRate(currencyPair);
    }
  }

  abstract buildUrl(url: string, currencyPair): string;

  abstract parseRate(
    currencyPair: CurrencyPairDto,
    response: any,
  ): RateResponseDto;
}
