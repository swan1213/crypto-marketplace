import { Dispatch } from 'redux'
import {
  breedRequest,
  BreedRequestAction,
  cancelBreedRequest,
  CancelBreedRequestAction,
  simulateBreedingRequest,
  SimulateBreedingRequestAction
} from '../../../modules/breed/actions'
import { GenesV2 } from '../../../modules/breed/types'
import { BreedingOrder } from '../../../modules/breedingOrder/types'
import { NFT } from '../../../modules/nft/types'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'

export type Props = {
  myNFT: NFT | null,
  selectedNFT: NFT | null,
  myBreedingOrder: BreedingOrder | null,
  selectedBreedingOrder: BreedingOrder | null,
  open: boolean
  simulatedGenes: GenesV2 | null
  isBreeding: boolean
  mutationFactor: number | null
  breedingPrice: string | null
  authorizations: Authorization[]
  wallet: Wallet | null
  onClose: () => void
  onSimulateBreeding: typeof simulateBreedingRequest
  onBreed: typeof breedRequest
}

export type MapStateProps = Pick<Props, 'simulatedGenes' | 'isBreeding' | 'breedingPrice' | 'authorizations'>
export type MapDispatchProps = Pick<Props, 'onSimulateBreeding' | 'onBreed'>
export type MapDispatch = Dispatch<
  SimulateBreedingRequestAction |
  BreedRequestAction |
  CancelBreedRequestAction
>
