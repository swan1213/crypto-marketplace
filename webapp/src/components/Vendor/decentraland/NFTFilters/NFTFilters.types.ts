import { Network, Rarity } from '@kmon/schemas'
import { Section, SortBy } from '../../../../modules/routing/types'
import { browseNFTs } from '../../../../modules/routing/actions'

export type Props = {
  count?: number
  section: Section
  sortBy?: SortBy
  priceToken?: string[]
  search: string
  onlyOnSale?: boolean
  isMap?: boolean
  wearableRarities: Rarity[]
  contracts: string[]
  network?: Network
  onBrowse: typeof browseNFTs
}

export type MapStateProps = Pick<
  Props,
  | 'count'
  | 'section'
  | 'sortBy'
  | 'search'
  | 'onlyOnSale'
  | 'isMap'
  | 'wearableRarities'
  | 'contracts'
  | 'network'
  | 'priceToken'
>
export type OwnProps = Pick<Props, 'onBrowse'>
