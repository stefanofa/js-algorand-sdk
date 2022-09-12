import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class AccountApplicationInformation extends JSONRequest {
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private account: string,
    private applicationID: number,
    limiter?: RateLimiter
  ) {
    super(c, intDecoding, limiter);
    this.account = account;
    this.applicationID = applicationID;
  }

  path() {
    return `/v2/accounts/${this.account}/applications/${this.applicationID}`;
  }
}
