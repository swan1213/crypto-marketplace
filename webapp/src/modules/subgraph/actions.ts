import { action } from 'typesafe-actions'

export const GET_BLOCK_NUMBER_REQUEST = '[Request] Get block number'
export const GET_BLOCK_NUMBER_SUCCESS = '[Success] Get block number'
export const GET_BLOCK_NUMBER_FAILURE = '[Failure] Get block number'

export const getBlockNumberRequest = () =>
  action(GET_BLOCK_NUMBER_REQUEST)
export const getBlockNumberSuccess = (blockNumber: number) =>
  action(GET_BLOCK_NUMBER_SUCCESS, { blockNumber })
export const getBlockNumberFailure = (error: string) =>
  action(GET_BLOCK_NUMBER_FAILURE, { error })

export type GetBlockNumberRequestAction = ReturnType<typeof getBlockNumberRequest>
export type GetBlockNumberSuccessAction = ReturnType<typeof getBlockNumberSuccess>
export type GetBlockNumberFailureAction = ReturnType<typeof getBlockNumberFailure>

export const GET_BREEDING_FEE_REQUEST = '[Request] Get Breeding Fee'
export const GET_BREEDING_FEE_SUCCESS = '[Success] Get Breeding Fee'
export const GET_BREEDING_FEE_FAILURE = '[Failure] Get Breeding Fee'

export const getBreedingFeeRequest = () =>
  action(GET_BREEDING_FEE_REQUEST)
export const getBreedingFeeSuccess = (breedingFee: string) =>
  action(GET_BREEDING_FEE_SUCCESS, { breedingFee })
export const getBreedingFeeFailure = (error: string) =>
  action(GET_BREEDING_FEE_FAILURE, { error })

export type GetBreedingFeeRequestAction = ReturnType<typeof getBreedingFeeRequest>
export type GetBreedingFeeSuccessAction = ReturnType<typeof getBreedingFeeSuccess>
export type GetBreedingFeeFailureAction = ReturnType<typeof getBreedingFeeFailure>
