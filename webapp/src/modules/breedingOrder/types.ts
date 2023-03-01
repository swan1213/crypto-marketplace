import { ChainId, Network } from '@kmon/schemas'

export enum BreedingOrderStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled'
}

export type BreedingOrder = {
  id: string
  kryptomonAddress: string
  tokenId: string
  price: string
  status: BreedingOrderStatus
  network: Network
  chainId: ChainId
  createdAt: number
  updatedAt: number
}
