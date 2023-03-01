import { Coin } from '@kmon/schemas'
import { Bid } from '../../../modules/bid/types'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  nft: NFT | null
  bid: Bid,
  coin: Coin | null
}
