import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class LightBlockHeaderProof extends JSONRequest {
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private round: number,
    limiter?: RateLimiter
  ) {
    super(c, intDecoding, limiter);

    this.round = round;
  }

  path() {
    return `/v2/blocks/${this.round}/lightheader/proof`;
  }
}