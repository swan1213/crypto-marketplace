import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  FetchNFTFailureAction,
  FetchNFTRequestAction,
  FetchNFTsFailureAction,
  FetchNFTsRequestAction,
  FetchNFTsSuccessAction,
  FetchNFTSuccessAction,
  FETCH_NFTS_SUCCESS,
  FETCH_NFT_SUCCESS
} from '../nft/actions'
import {
  AddToBreedingCentreFailureAction,
  AddToBreedingCentreRequestAction,
  AddToBreedingCentreSuccessAction,
  ADD_TO_BREEDING_CENTRE_FAILURE,
  ADD_TO_BREEDING_CENTRE_REQUEST,
  ADD_TO_BREEDING_CENTRE_SUCCESS
} from './actions'
import { BreedingOrder } from './types'

export type BreedingOrderState = {
  data: Record<string, BreedingOrder>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {},
  loading: [],
  error: null
}

type NFTReducerAction =
  | AddToBreedingCentreRequestAction
  | AddToBreedingCentreSuccessAction
  | AddToBreedingCentreFailureAction
  | FetchNFTsRequestAction
  | FetchNFTsSuccessAction
  | FetchNFTsFailureAction
  | FetchNFTRequestAction
  | FetchNFTSuccessAction
  | FetchNFTFailureAction

export function breedingOrderReducer(
  state: BreedingOrderState = INITIAL_STATE,
  action: NFTReducerAction
) {
  switch (action.type) {
    case ADD_TO_BREEDING_CENTRE_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case ADD_TO_BREEDING_CENTRE_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case ADD_TO_BREEDING_CENTRE_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    case FETCH_NFTS_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.breedingOrders.reduce((obj, breedingOrder) => {
            obj[breedingOrder.id] = breedingOrder
            return obj
          }, {} as Record<string, BreedingOrder>)
        },
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case FETCH_NFT_SUCCESS: {
      const { breedingOrder } = action.payload
      if (breedingOrder) {
        return {
          ...state,
          data: {
            ...state.data,
            [breedingOrder.id]: breedingOrder
          }
        }
      }
      return state
    }
    default:
      return state
  }
}
