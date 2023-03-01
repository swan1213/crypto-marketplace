import { RootState } from '../reducer'

export const getState = (state: RootState) => state.subgraph
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getSubgraphBlockNumber = (state: RootState) => getData(state).blockNumber
export const getBreedingFee = (state: RootState) => getData(state).breedingFee
