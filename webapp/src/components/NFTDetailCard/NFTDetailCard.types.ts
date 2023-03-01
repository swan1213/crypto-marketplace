import { Order } from '../../modules/order/types'
import { NFT } from '../../modules/nft/types'

export type Props = {
  nft: NFT
  elementType: any
  order?: Order
  isV2: boolean
  toogleV2: () => void
}

export type MapStateProps = Pick<Props, 'order'>
export type MapDispatchProps = {}
export type OwnProps = Pick<Props, 'nft' | 'order'>
