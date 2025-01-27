import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class StatusAfterBlock extends JSONRequest {
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private round: number,
    limiter?: RateLimiter
  ) {
    super(c, intDecoding, limiter);
    if (!Number.isInteger(round)) throw Error('round should be an integer');
    this.round = round;
  }

  path() {
    return `/v2/status/wait-for-block-after/${this.round}`;
  }
}
