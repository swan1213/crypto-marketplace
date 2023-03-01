import { RootState } from '../reducer'
import { createSelector } from 'reselect'
import { NFT } from '../nft/types'
import { BreedingOrder } from './types'
import { BreedingOrderState } from './reducer'
import { getActiveBreedingOrder } from './utils'
import { getMyNFT, getSelectedNFT } from '../breed/selectors'
import { getCurrentNFT } from '../nft/selectors'

export const getState = (state: RootState) => state.breedingOrder
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getMyBreedingOrder = createSelector<
  RootState,
  NFT | null,
  BreedingOrderState["data"],
  BreedingOrder | null
>(
  state => getMyNFT(state),
  state => getData(state),
  (nft, breedingOrders) => getActiveBreedingOrder(nft, breedingOrders)
)
export const getSelectedBreedingOrder = createSelector<
  RootState,
  NFT | null,
  BreedingOrderState["data"],
  BreedingOrder | null
>(
  state => getSelectedNFT(state),
  state => getData(state),
  (nft, breedingOrders) => getActiveBreedingOrder(nft, breedingOrders)
)
export const getCurrentNFTBreedingOrder = createSelector<
  RootState,
  NFT | null,
  BreedingOrderState["data"],
  BreedingOrder | null
>(
  state => getCurrentNFT(state),
  state => getData(state),
  (nft, breedingOrders) => getActiveBreedingOrder(nft, breedingOrders)
)
