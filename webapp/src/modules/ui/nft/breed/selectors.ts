import { RootState } from '../../../reducer'

export const getState = (state: RootState) => state.ui.nft.breed
export const getShowBreedPriceModal = (state: RootState) => getState(state).showBreedPriceModal
