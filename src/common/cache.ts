interface CacheDescriptor {
  value: any;
  timerID: number;
  timeout: number;
}

interface CacheObject extends ObjectIndexer<CacheDescriptor> {}

type DataByteUnit = 'B' | 'kB' | 'mB' | 'gB';

/**
 * Minimalistic cache engine to temporarily store loaded data from local storage.
 */
export default class Cache {
  private static readonly cacheObj: CacheObject = {};

  static getCacheObject() {
    return this.cacheObj;
  }

  static getCacheSize(unit: DataByteUnit) {
    const stringJson = JSON.stringify(this.cacheObj);

    const mapUnitToMultiplier = {
      B: 1,
      kB: 1000,
      mB: 10 ** 6,
      gB: 10 ** 9
    };

    return stringJson.length * (1 / mapUnitToMultiplier[unit]);
  }

  static clearCache() {
    for (let key in this.cacheObj) {
      delete this.cacheObj[key];
    }
  }

  static put(key: string, value: any, timeout = 1800 * 1000) {
    if (!this.cacheObj[key] || typeof this.cacheObj[key] != 'undefined') {
      // @ts-ignore
      this.cacheObj[key] = {};
      this.cacheObj[key].value = value;
      this.cacheObj[key].timeout = timeout;
      this.cacheObj[key].timerID = this._createTimeout(key);
    }

    return this.cacheObj[key].value;
  }

  private static _createTimeout(key: string) {
    return setTimeout(() => {
      delete this.cacheObj[key];
    }, this.cacheObj[key].timeout);
  }

  static retrieve(key: string) {
    if (typeof this.cacheObj[key] != 'undefined') {
      clearTimeout(this.cacheObj[key].timerID);
      this.cacheObj[key].timerID = this._createTimeout(key);
      return this.cacheObj[key].value;
    }

    return null;
  }
}
