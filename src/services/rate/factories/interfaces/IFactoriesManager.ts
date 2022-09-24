import { IProviderFactory } from "./IProviderFactory";

interface IFactoriesManager {
  readonly main: IProviderFactory;
  readonly list: IProviderFactory[];
}

export { IFactoriesManager };
