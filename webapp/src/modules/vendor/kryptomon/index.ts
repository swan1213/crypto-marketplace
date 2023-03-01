import { BidService } from './BidService'
import { ContractService } from './ContractService'
import { NFTService } from './NFTService'
import { OrderService } from './OrderService'

export const VendorName = 'kryptomon' as const

export * from './bid'
export * from './nft'
export * from './order'
export * from './routing'

export * from './ContractService'

export const services = {
  BidService,
  ContractService,
  NFTService,
  OrderService
}
