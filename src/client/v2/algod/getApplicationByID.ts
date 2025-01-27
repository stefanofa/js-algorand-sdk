import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class GetApplicationByID extends JSONRequest {
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private index: number,
    limiter: RateLimiter
  ) {
    super(c, intDecoding, limiter);
    this.index = index;
  }

  path() {
    return `/v2/applications/${this.index}`;
  }
}
