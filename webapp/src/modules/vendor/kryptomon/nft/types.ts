import {
  Network,
  Rarity,
  WearableCategory,
  NFT as BaseNFT
} from '@kmon/schemas'
import { BreedingOrder } from '../../../breedingOrder/types'
import { NFT } from '../../../nft/types'
import { Order } from '../../../order/types'
import { VendorName } from '../../types'
export type MetaAttribute = {
  trait_type: string
  value: string | number
  display_type: string | undefined
}

export type NFTsFetchFilters = {
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: Rarity[]
  contracts?: string[]
  network?: Network
}

export type NFTResult = {
  nft: Omit<NFT<VendorName.KRYPTOMON>, 'vendor'>
  order: Order | null
  breedingOrder: BreedingOrder | null
}

export type NFTResponse = {
  data: NFTResult[]
  total: number
}

export type KryptomonMetadataResponse = {
  description: string
  image: string
  name: string
  attributes?: MetaAttribute[]
}

export type NFTData = BaseNFT['data']
