import { NFT as BaseNFT, NFTCategory } from '@kmon/schemas'
import { View } from '../ui/types'
import { NFTsFetchFilters } from '../vendor/nft/types'
import { VendorName } from '../vendor/types'
import { SortDirection } from '../routing/types'
import {
  KryptomonMetadataResponse,
  NFTData as DecentralandData
} from '../vendor/decentraland/nft/types'
import { NFTData as SuperRareData } from '../vendor/super_rare/nft/types'
import { NFTData as MakersPlaceData } from '../vendor/makers_place/nft/types'
import { NFTData as KnownOriginData } from '../vendor/known_origin/nft/types'
import { NFTData as KryptomonData } from '../vendor/kryptomon/nft/types'

export enum NFTSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  ORDER_CREATED_AT = 'searchOrderCreatedAt',
  PRICE = 'searchOrderPrice'
}

export type Data<V extends VendorName> = V extends VendorName.DECENTRALAND
  ? DecentralandData
  : V extends VendorName.SUPER_RARE
  ? SuperRareData
  : V extends VendorName.MAKERS_PLACE
  ? MakersPlaceData
  : V extends VendorName.KNOWN_ORIGIN
  ? KnownOriginData
  : V extends VendorName.KRYPTOMON
  ? KryptomonData
  : V extends void
  ?
      | DecentralandData
      | SuperRareData
      | MakersPlaceData
      | KnownOriginData
      | KryptomonData
  : never

export type NFTGenesV2 = {
  fire: number
  fireTalent: number
  water: number
  waterTalent: number
  ice: number
  iceTalent: number
  ground: number
  groundTalent: number
  air: number
  airTalent: number
  electro: number
  electroTalent: number
  ghost: number
  ghostTalent: number
  grass: number
  grassTalent: number
  color: number
  sex: number
  generalTalent: number
  attack: number
  defense: number
  special: number
  xFactor: number
  growthTalentFactor: number
  constitution: number
  healthPoints: number
  speed: number
  affections: number
  crazyness: number
  instinct: number
  hunger: number
  laziness: number
  brave: number
  smart: number
  bodySize: number
  ego: number
  skinType: number
  generation: number
}

export type NFT<V extends VendorName = VendorName.KRYPTOMON> = Omit<
  BaseNFT,
  'category' | 'data'
> & {
  category: NFTCategory | 'art' | 'wearable' | 'estate' | 'parcel' | 'ens'
  vendor: VendorName
  metadata: KryptomonMetadataResponse
  data: Data<V>
  genesV2?: NFTGenesV2
}

export type NFTsFetchParams = {
  first: number
  skip: number
  orderBy?: NFTSortBy
  orderDirection?: SortDirection
  category?: NFTCategory | 'art' | 'wearable' | 'estate' | 'parcel' | 'ens'
  address?: string
  onlyOnSale?: boolean
  search?: string
  section?: string
  kryptomonStatus?: string
  elemTypes?: string
  specialties?: string
  supers?: string
  unfreezable?: string
  generation?: string
  affection?: string
  braveness?: string
  constitution?: string
  craziness?: string
  hunger?: string
  instinct?: string
  smart?: string
  elementStartingTalent?: string
  laziness?: string
  sex?: string
  skinType?: string
  bodySize?: string
  ego?: string
  healthPoints?: string
  speed?: string
  orderStatus?: string
  water?: string
  waterTalent?: string
  fire?: string
  fireTalent?: string
  ground?: string
  groundTalent?: string
  ice?: string
  iceTalent?: string
  grass?: string
  grassTalent?: string
  electro?: string
  electroTalent?: string
  ghost?: string
  ghostTalent?: string
  air?: string
  airTalent?: string
  color?: string
  attack?: string
  defence?: string
  generalTalent?: string
  growthTalentFactor?: string
  elementPercentage?: string
  special?: string
  price?: string
  priceToken?: string
  isInBreedingCentre?: boolean,
  owner?: string
}

export type NFTsCountParams = Omit<NFTsFetchParams, 'first' | 'skip'>

export type NFTsFetchOptions = {
  vendor: VendorName
  view: View
  params: NFTsFetchParams
  filters?: NFTsFetchFilters
}
