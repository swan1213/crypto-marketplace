import { ChainId, Network } from '@kmon/schemas'
import { OrderStatus } from '../order/types'

export type Bid = {
  id: string
  bidder: string
  seller: string
  price: string
  paymentToken: string
  fingerprint: string
  status: OrderStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  createdAt: number
  updatedAt: number
  contractAddress: string
  tokenId: string
  network: Network
  chainId: ChainId
}
