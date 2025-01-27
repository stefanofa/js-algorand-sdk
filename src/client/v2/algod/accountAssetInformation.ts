import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class AccountAssetInformation extends JSONRequest {
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private account: string,
    private assetID: number,
    limiter?: RateLimiter
  ) {
    super(c, intDecoding, limiter);
    this.account = account;
    this.assetID = assetID;
  }

  path() {
    return `/v2/accounts/${this.account}/assets/${this.assetID}`;
  }
}
