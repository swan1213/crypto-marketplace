import { Network, Rarity } from '@kmon/schemas'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { View } from '../ui/types'

export { Section } from '../vendor/routing/types'

export enum SortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest',
  DEAREST = 'dearest'
}

export enum PriceToken {
  ALL = 'all',
  BNB = 'bnb',
  KMON = 'kmon',
  KMON_TEST = 'kmon-test'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export type SearchOptions = {
  view?: View
  vendor?: VendorName
  page?: number
  section?: Section
  sortBy?: SortBy
  onlyOnSale?: boolean
  isMap?: boolean
  isFullscreen?: boolean
  wearableRarities?: Rarity[]
  search?: string
  contracts?: string[]
  address?: string
  network?: Network
  kryptomonStatus?: string[]

  elemTypes?: string[]
  specialties?: string[]
  supers?: string[]
  unfreezable?: string[]
  generation?: string[]
  affection?: string[]
  braveness?: string[]
  constitution?: string[]
  craziness?: string[]
  hunger?: string[]
  instinct?: string[]
  smart?: string[]
  elementStartingTalent?: string[]
  laziness?: string[]
  sex?: string[]
  skinType?: string[]
  bodySize?: string[]
  ego?: string[]
  healthPoints?: string[]
  speed?: string[]
  orderStatus?: string
  water?: string[]
  waterTalent?: string[]
  fire?: string[]
  fireTalent?: string[]
  ground?: string[]
  groundTalent?: string[]
  ice?: string[]
  iceTalent?: string[]
  grass?: string[]
  grassTalent?: string[]
  electro?: string[]
  electroTalent?: string[]
  ghost?: string[]
  ghostTalent?: string[]
  air?: string[]
  airTalent?: string[]
  color?: string[]
  attack?: string[]
  defence?: string[]
  generalTalent?: string[]
  growthTalentFactor?: string[]
  elementPercentage?: string[]
  special?: string[]
  price?: string[]
  priceToken?: string[]

  returnPath?: string
  isInBreedingCentre?: boolean
  owner?: string
}
