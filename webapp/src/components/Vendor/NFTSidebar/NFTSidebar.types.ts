import { Dispatch } from 'redux'

import { Section } from '../../../modules/vendor/routing/types'
import { browseNFTs, BrowseNFTsAction } from '../../../modules/routing/actions'
import { MultipleFilters } from './NFTSidebar'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  vendor?: string
  section: Section
  myNFT: NFT | null
  address: string | undefined
  onBrowse: typeof browseNFTs
  pathname: string
} & MultipleFilters

export type MapStateProps = Pick<
  Props,
  | 'vendor'
  | 'section'
  | 'pathname'
  | 'elemTypes'
  | 'specialties'
  | 'supers'
  | 'generation'
  | 'affection'
  | 'braveness'
  | 'constitution'
  | 'craziness'
  | 'hunger'
  | 'instinct'
  | 'smart'
  | 'elementStartingTalent'
  | 'laziness'
  | 'bodySize'
  | 'ego'
  | 'healthPoints'
  | 'speed'
  | 'sex'
  | 'skinType'
  | 'water'
  | 'waterTalent'
  | 'fire'
  | 'fireTalent'
  | 'ground'
  | 'groundTalent'
  | 'ice'
  | 'iceTalent'
  | 'grass'
  | 'grassTalent'
  | 'electro'
  | 'electroTalent'
  | 'ghost'
  | 'ghostTalent'
  | 'air'
  | 'airTalent'
  | 'color'
  | 'attack'
  | 'defence'
  | 'generalTalent'
  | 'growthTalentFactor'
  | 'elementPercentage'
  | 'special'
  | 'price'
  | 'priceToken'
  | 'kryptomonStatus'
  | 'unfreezable'
  | 'myNFT'
  | 'address'
>
export type MapDispatchProps = Pick<Props, 'onBrowse'>
export type MapDispatch = Dispatch<BrowseNFTsAction>
