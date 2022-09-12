import JSONRequest from '../jsonrequest';

/**
 * healthCheck returns an empty object iff the node is running
 */
export default class HealthCheck extends JSONRequest {
  // eslint-disable-next-line class-methods-use-this
  path() {
    return '/health';
  }

  async do(
    headers = {},
    retryIfFailed: boolean = true,
    retryCount: number = 0
  ) {
    try {
      if (this.limiter) await this.limiter.removeTokens(1);

      const res = await this.c.get(this.path(), {}, headers);
      if (!res.ok) {
        throw new Error(`Health response: ${res.status}`);
      }
      return {};
    } catch (e) {
      if (!retryIfFailed) throw e;
      const canRetry = await this.waitBeforeRetry(retryCount);
      if (!canRetry) throw e;
      return this.do(headers, retryIfFailed, retryCount + 1);
    }
  }
}
