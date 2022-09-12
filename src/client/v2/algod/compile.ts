import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';

/**
 * Sets the default header (if not previously set)
 * @param headers - A headers object
 */
export function setHeaders(headers = {}) {
  let hdrs = headers;
  if (Object.keys(hdrs).every((key) => key.toLowerCase() !== 'content-type')) {
    hdrs = { ...headers };
    hdrs['Content-Type'] = 'text/plain';
  }
  return hdrs;
}

/**
 * Executes compile
 */
export default class Compile extends JSONRequest {
  constructor(
    c: HTTPClient,
    private source: string | Uint8Array,
    limiter?: RateLimiter
  ) {
    super(c, undefined, limiter);
    this.source = source;
  }

  // eslint-disable-next-line class-methods-use-this
  path() {
    return `/v2/teal/compile`;
  }

  sourcemap(map: boolean = true) {
    this.query.sourcemap = map;
    return this;
  }

  /**
   * Executes compile
   * @param headers - A headers object
   */
  async do(
    headers = {},
    retryIfFailed: boolean = true,
    retryCount: number = 0
  ) {
    try {
      if (this.limiter) await this.limiter.removeTokens(1);

      const txHeaders = setHeaders(headers);
      const res = await this.c.post(
        this.path(),
        Buffer.from(this.source),
        txHeaders,
        this.query
      );
      return res.body;
    } catch (e) {
      if (!retryIfFailed) throw e;
      const canRetry = await this.waitBeforeRetry(retryCount);
      if (!canRetry) throw e;
      return this.do(headers, retryIfFailed, retryCount + 1);
    }
  }
}
