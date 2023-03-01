import { action } from 'typesafe-actions'

export const ADD_TO_BREEDING_CENTRE_REQUEST = '[Request] Add To Breeding Centre'
export const ADD_TO_BREEDING_CENTRE_SUCCESS = '[Success] Add To Breeding Centre'
export const ADD_TO_BREEDING_CENTRE_FAILURE = '[Failure] Add To Breeding Centre'

export const addToBreedigCentreRequest = (contractAddress: string, tokenId: string, price: string) =>
  action(ADD_TO_BREEDING_CENTRE_REQUEST, { contractAddress, tokenId, price })
export const addToBreedigCentreSuccess = () => action(ADD_TO_BREEDING_CENTRE_SUCCESS, {})
export const addToBreedingCentreFailure = (
  tokenId: string,
  error: string
) => action(ADD_TO_BREEDING_CENTRE_FAILURE, {
  tokenId,
  error
})

export type AddToBreedingCentreRequestAction = ReturnType<typeof addToBreedigCentreRequest>
export type AddToBreedingCentreSuccessAction = ReturnType<typeof addToBreedigCentreSuccess>
export type AddToBreedingCentreFailureAction = ReturnType<typeof addToBreedingCentreFailure>