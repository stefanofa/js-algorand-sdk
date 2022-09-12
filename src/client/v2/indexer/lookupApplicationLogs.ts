import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class LookupApplicationLogs extends JSONRequest {
  /**
   * Returns log messages generated by the passed in application.
   *
   * #### Example
   * ```typescript
   * const appId = 60553466;
   * const appLogs = await indexerClient.lookupApplicationLogs(appId).do();
   * ```
   *
   * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idlogs)
   * @param appID - The ID of the application which generated the logs.
   * @category GET
   */
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private appID: number,
    limiter: RateLimiter
  ) {
    super(c, intDecoding, limiter);
    this.appID = appID;
  }

  /**
   * @returns `/v2/applications/${appID}/logs`
   */
  path() {
    return `/v2/applications/${this.appID}/logs`;
  }

  /**
   * Limit results for pagination.
   *
   * #### Example
   * ```typescript
   * const maxResults = 20;
   * const appLogs = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .limit(maxResults)
   *        .do();
   * ```
   *
   * @param limit - maximum number of results to return.
   */
  limit(limit: number) {
    this.query.limit = limit;
    return this;
  }

  /**
   * Include results at or after the specified min-round.
   *
   * #### Example
   * ```typescript
   * const minRound = 18309917;
   * const appLogs = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .minRound(minRound)
   *        .do();
   * ```
   *
   * @param round
   * @category query
   */
  minRound(round: number) {
    this.query['min-round'] = round;
    return this;
  }

  /**
   * Include results at or before the specified max-round.
   *
   * #### Example
   * ```typescript
   * const maxRound = 18309917;
   * const appLogs = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .maxRound(maxRound)
   *        .do();
   * ```
   *
   * @param round
   * @category query
   */
  maxRound(round: number) {
    this.query['max-round'] = round;
    return this;
  }

  /**
   * The next page of results.
   *
   * #### Example
   * ```typescript
   * const maxResults = 25;
   *
   * const appLogsPage1 = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .limit(maxResults)
   *        .do();
   *
   * const appLogsPage2 = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .limit(maxResults)
   *        .nextToken(appLogsPage1["next-token"])
   *        .do();
   * ```
   *
   * @param nextToken - provided by the previous results.
   * @category query
   */
  nextToken(nextToken: string) {
    this.query.next = nextToken;
    return this;
  }

  /**
   * Only include transactions with this sender address.
   *
   * #### Example
   * ```typescript
   * const sender = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
   * const appLogs = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .sender(sender)
   *        .do();
   * ```
   *
   * @param senderAddress
   * @category query
   */
  sender(senderAddress: string) {
    this.query['sender-address'] = senderAddress;
    return this;
  }

  /**
   * Lookup the specific transaction by ID.
   *
   * #### Example
   * ```typescript
   * const txId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
   * const appLogs = await indexerClient
   *        .lookupApplicationLogs(appId)
   *        .txid(txId)
   *        .do();
   * ```
   *
   * @param txid
   * @category query
   */
  txid(txid: string) {
    this.query.txid = txid;
    return this;
  }
}
