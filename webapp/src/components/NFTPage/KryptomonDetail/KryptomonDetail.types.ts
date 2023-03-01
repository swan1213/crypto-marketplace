import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { NFT } from '../../../modules/nft/types'
import { VendorName } from '../../../modules/vendor/types'
import { Order } from '../../../modules/order/types'

export type Props = {
  nft: NFT<VendorName.KRYPTOMON>
  order: Order | null
  onNavigate: (path: string) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
