import { Order } from '../../modules/order/types'
import { NFT } from '../../modules/nft/types'
import { BreedingOrder } from '../../modules/breedingOrder/types'

export type Props = {
  nft: NFT
  order?: Order
  breedingOrder?: BreedingOrder
  isPreventClick?: boolean
  onClickCard?: (nft: NFT) => void
  status?: {
    showPrice?: boolean
    showPriceBottom?: boolean
    showPriceTopLeft?: boolean
  }
}

export type MapStateProps = Pick<Props, 'order' | 'breedingOrder'>
export type MapDispatchProps = {}
export type OwnProps = Pick<Props, 'nft' | 'order' | 'breedingOrder'>
