import { NFT } from '../../modules/nft/types'
import { KryptomonMetadataResponse } from '../../modules/vendor/decentraland'

export type Props = {
  nft: NFT
  className?: string
  isDraggable?: boolean
  withNavigation?: boolean
  hasPopup?: boolean
  zoom?: number
  isSmall?: boolean
  showMonospace?: boolean
}
