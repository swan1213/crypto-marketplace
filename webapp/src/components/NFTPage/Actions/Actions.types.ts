import { Dispatch } from 'redux'
import { Wallet } from '@kmon/dapps/dist/modules//wallet/types'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'

import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { Bid } from '../../../modules/bid/types'
import {
  addToBreedigCentreRequest,
  AddToBreedingCentreRequestAction,
} from '../../../modules/breedingOrder/actions'
import { cancelBreedRequest, CancelBreedRequestAction, resetNFTForBreedingRequest, ResetNFTForBreedingRequestAction } from '../../../modules/breed/actions'
import { BreedingOrder } from '../../../modules/breedingOrder/types'
import { showBreedPriceModal, ShowBreedPriceModalAction } from '../../../modules/ui/actions'

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  nft: NFT
  order: Order | null
  bids: Bid[]
  isAddingToBreedingCentre: boolean
  currentNFTBreedingOrder: BreedingOrder | null
  isCancelingBreed: boolean
  showBreedPriceModal: boolean
  onAddToBreedingCentre: typeof addToBreedigCentreRequest
  onResetMyNFT: typeof resetNFTForBreedingRequest
  onNavigate: (path: string) => void
  onCancelListing: typeof cancelBreedRequest
  onShowBreedPriceModal: typeof showBreedPriceModal
}

export type MapStateProps = Pick<
  Props,
  'wallet' |
  'authorizations' |
  'order' |
  'bids' |
  'isAddingToBreedingCentre' |
  'currentNFTBreedingOrder' |
  'isCancelingBreed' |
  'showBreedPriceModal'
>
export type MapDispatchProps = Pick<Props, 'onAddToBreedingCentre' | 'onNavigate' | 'onResetMyNFT' | 'onCancelListing' | 'onShowBreedPriceModal'>
export type MapDispatch = Dispatch<
  AddToBreedingCentreRequestAction |
  CallHistoryMethodAction |
  ResetNFTForBreedingRequestAction |
  CancelBreedRequestAction |
  ShowBreedPriceModalAction
>
export type OwnProps = Pick<Props, 'nft'>
