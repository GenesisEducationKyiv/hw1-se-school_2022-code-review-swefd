interface ICacheable {
  cacheKey: any;
  getFromCache(cacheKey: any): any;
}

export { ICacheable };
