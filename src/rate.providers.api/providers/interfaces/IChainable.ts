import { ICurrencyProvider } from './ICurrencyProvider';

export interface IChainable {
  nextHandler: ICurrencyProvider | undefined;
  setNext(Handler: ICurrencyProvider | null): ICurrencyProvider;
}
