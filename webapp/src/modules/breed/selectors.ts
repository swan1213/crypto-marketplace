import { createMatchSelector } from 'connected-react-router'
import { createSelector } from 'reselect'
import { NFT } from '../nft/types'

import { RootState } from '../reducer'
import { locations } from '../routing/locations'
import { getBreedingFee } from '../subgraph/selectors'
import { calcBreedingPrice, calcMutationFactor } from './utils'

export const getState = (state: RootState) => state.breed
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error

export const getMyNFT = (state: RootState) => getData(state).myNFT
export const getSelectedNFT = (state: RootState) => getData(state).selectedNFT
export const getSimulatedGenes = (state: RootState) => getData(state).simulatedGenes

const nftDetailMatchSelector = createMatchSelector<
  RootState,
  {
    contractAddress: string
    tokenId: string
  }
>(locations.breed(':contractAddress', ':tokenId'))

export const getContractAddress = createSelector<
  RootState,
  ReturnType<typeof nftDetailMatchSelector>,
  string | null
>(nftDetailMatchSelector, match => match?.params.contractAddress || null)

export const getTokenId = createSelector<
  RootState,
  ReturnType<typeof nftDetailMatchSelector>,
  string | null
>(nftDetailMatchSelector, match => match?.params.tokenId || null)

export const getMutationFactor = createSelector<
  RootState,
  NFT | null,
  NFT | null,
  number | null
>(
  state => getMyNFT(state),
  state => getSelectedNFT(state),
  (myNFT, selectedNFT) => calcMutationFactor(myNFT, selectedNFT)
)

export const getBreedingPrice = createSelector<
  RootState,
  NFT | null,
  NFT | null,
  string | null,
  string | null
>(
  state => getMyNFT(state),
  state => getSelectedNFT(state),
  state => getBreedingFee(state),
  (myNFT, selectedNFT, breedingFee) => calcBreedingPrice(myNFT, selectedNFT, breedingFee)
)
