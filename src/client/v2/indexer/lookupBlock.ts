import { RateLimiter } from 'limiter';
import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import IntDecoding from '../../../types/intDecoding';

export default class LookupBlock extends JSONRequest {
  /**
   * Returns the block for the passed round.
   *
   * #### Example
   * ```typescript
   * const targetBlock = 18309917;
   * const blockInfo = await indexerClient.lookupBlock(targetBlock).do();
   * ```
   *
   * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2blocksround-number)
   * @param round - The number of the round to look up.
   * @category GET
   */
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private round: number,
    limiter: RateLimiter
  ) {
    super(c, intDecoding, limiter);
    this.round = round;
  }

  /**
   * @returns `/v2/blocks/${round}`
   */
  path() {
    return `/v2/blocks/${this.round}`;
  }
}
