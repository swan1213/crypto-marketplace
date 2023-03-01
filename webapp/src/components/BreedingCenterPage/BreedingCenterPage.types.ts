import { Dispatch } from "redux"
import {
  selectNFTForBreedingRequest,
  SelectNFTForBreedingRequestAction
} from "../../modules/breed/actions"
import { BreedingOrder } from "../../modules/breedingOrder/types"
import { fetchNFTRequest, FetchNFTRequestAction } from "../../modules/nft/actions"
import { NFT } from '../../modules/nft/types'
import { GetBreedingFeeFailureAction, getBreedingFeeRequest, GetBreedingFeeRequestAction } from "../../modules/subgraph/actions"

export type Props = {
  contractAddress: string | null
  tokenId: string | null
  myNFT: NFT | null
  selectedNFT: NFT | null
  myBreedingOrder: BreedingOrder | null
  selectedBreedingOrder: BreedingOrder | null
  mutationFactor: number | null
  onFetchRequest: typeof fetchNFTRequest
  onSelectNFTForBreeding: typeof selectNFTForBreedingRequest
  onGetBreedingFee: typeof getBreedingFeeRequest
}

export type MapStateProps = Pick<Props,
  'contractAddress' | 'tokenId' | 'myNFT' | 'selectedNFT' | 'myBreedingOrder' | 'selectedBreedingOrder' | 'mutationFactor'
>
export type MapDispatchProps = Pick<Props,
  'onFetchRequest' |
  'onSelectNFTForBreeding' |
  'onGetBreedingFee'
>
export type MapDispatch = Dispatch<
  FetchNFTRequestAction |
  SelectNFTForBreedingRequestAction |
  GetBreedingFeeRequestAction
>
export type OwnProps = Partial<Pick<Props, 'contractAddress' | 'tokenId'>>
