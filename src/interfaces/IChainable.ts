import { providerFactory } from "../services/rate/factories/providerFactory";

interface IChainable {
  setNext(factory: providerFactory | null): providerFactory;
}

export { IChainable };
