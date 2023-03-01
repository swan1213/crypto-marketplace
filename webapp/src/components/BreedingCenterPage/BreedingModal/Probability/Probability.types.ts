import { NFT } from '../../../../modules/nft/types'

export type Props = {
  myNFT: NFT,
  selectedNFT: NFT,
  simulatedGenes: number[],
  mutationFactor: number | null
}