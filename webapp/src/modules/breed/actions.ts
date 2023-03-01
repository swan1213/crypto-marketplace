import { action } from 'typesafe-actions'

import { NFT } from '../nft/types'
import { GenesV2 } from './types'

export const RESET_NFT_FOR_BREEDING_REQUEST = '[Request] Reset NFT FOR BREEDING'
export const SELECT_NFT_FOR_BREEDING_REQUEST = '[Request] Select NFT FOR BREEDING'
export const RESET_SELECTED_NFT_FOR_BREEDING_REQUEST = '[Request] Reset selected NFT FOR BREEDING'

export const resetNFTForBreedingRequest = () => action(RESET_NFT_FOR_BREEDING_REQUEST, {})
export const selectNFTForBreedingRequest = (nft: NFT) => action(SELECT_NFT_FOR_BREEDING_REQUEST, { nft })
export const resetSelectedNFTForBreedingRequest = () => action(RESET_SELECTED_NFT_FOR_BREEDING_REQUEST, {})

export type ResetNFTForBreedingRequestAction = ReturnType<typeof resetNFTForBreedingRequest>
export type SelectNFTForBreedingRequestAction = ReturnType<typeof selectNFTForBreedingRequest>
export type ResetSelectedNFTForBreedingRequestAction = ReturnType<typeof resetSelectedNFTForBreedingRequest>

export const SIMULATE_BREEDING_REQUEST = '[Request] Simulate Breeding'
export const SIMULATE_BREEDING_SUCCESS = '[Success] Simulate Breeding'
export const SIMULATE_BREEDING_FAILURE = '[Failure] Simulate Breeding'

export const simulateBreedingRequest = (femaleTokenId: string, maleTokenId: string) =>
  action(SIMULATE_BREEDING_REQUEST, { femaleTokenId, maleTokenId })
export const simulateBreedingSuccess = (genes: GenesV2) =>
  action(SIMULATE_BREEDING_SUCCESS, { genes })
export const simulateBreedingFailure = (femaleTokenId: string, maleTokenId: string, error: string) =>
  action(SIMULATE_BREEDING_FAILURE, { femaleTokenId, maleTokenId, error })

export type SimulateBreedingRequestAction = ReturnType<typeof simulateBreedingRequest>
export type SimulateBreedingSuccessAction = ReturnType<typeof simulateBreedingSuccess>
export type SimulateBreedingFailureAction = ReturnType<typeof simulateBreedingFailure>

export const BREED_REQUEST = '[Request] Breed'
export const BREED_SUCCESS = '[Success] Breed'
export const BREED_FAILURE = '[Failure] Breed'

export const breedRequest = (femaleTokenId: string, maleTokenId: string) =>
  action(BREED_REQUEST, { femaleTokenId, maleTokenId })
export const breedSuccess = () => action(BREED_SUCCESS, {})
export const breedFailure = (femaleTokenId: string, maleTokenId: string, error: string) =>
  action(BREED_FAILURE, { femaleTokenId, maleTokenId, error })

export type BreedRequestAction = ReturnType<typeof breedRequest>
export type BreedSuccessAction = ReturnType<typeof breedSuccess>
export type BreedFailureAction = ReturnType<typeof breedFailure>

export const CANCEL_BREED_REQUEST = '[Request] Cancel Breed'
export const CANCEL_BREED_SUCCESS = '[Success] Cancel Breed'
export const CANCEL_BREED_FAILURE = '[Failure] Cancel Breed'

export const cancelBreedRequest = (contractAddress: string, tokenId: string) =>
  action(CANCEL_BREED_REQUEST, { contractAddress, tokenId })
export const cancelBreedSuccess = () => action(CANCEL_BREED_SUCCESS)
export const cancelBreedFailure = (error: string) => action(CANCEL_BREED_FAILURE, { error })

export type CancelBreedRequestAction = ReturnType<typeof cancelBreedRequest>
export type CancelBreedSuccessAction = ReturnType<typeof cancelBreedSuccess>
export type CancelBreedFailureAction = ReturnType<typeof cancelBreedFailure>
