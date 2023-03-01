import { BreedingOrder } from '../../../../modules/breedingOrder/types'
import { NFT } from '../../../../modules/nft/types'

export type Props = {
  myNFT: NFT,
  selectedNFT: NFT
  isBreeding: boolean
  breedingPrice: string | null
  selectedBreedingOrder: BreedingOrder | null
  onBreed: () => void
  onCancel: () => void
}