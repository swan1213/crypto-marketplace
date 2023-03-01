import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  GetBlockNumberFailureAction,
  GetBlockNumberRequestAction,
  GetBlockNumberSuccessAction,
  GetBreedingFeeFailureAction,
  GetBreedingFeeRequestAction,
  GetBreedingFeeSuccessAction,
  GET_BLOCK_NUMBER_FAILURE,
  GET_BLOCK_NUMBER_REQUEST,
  GET_BLOCK_NUMBER_SUCCESS,
  GET_BREEDING_FEE_FAILURE,
  GET_BREEDING_FEE_REQUEST,
  GET_BREEDING_FEE_SUCCESS
} from './actions'

export type SubgraphState = {
  loading: LoadingState
  data: {
    blockNumber?: number,
    breedingFee: string | null
  }
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  data: {
    blockNumber: undefined,
    breedingFee: null
  },
  error: null
}

type SubgraphReducerAction =
  | GetBlockNumberRequestAction
  | GetBlockNumberSuccessAction
  | GetBlockNumberFailureAction
  | GetBreedingFeeRequestAction
  | GetBreedingFeeSuccessAction
  | GetBreedingFeeFailureAction

export function subgraphReducer(
  state: SubgraphState = INITIAL_STATE,
  action: SubgraphReducerAction
): SubgraphState {
  switch (action.type) {
    case GET_BLOCK_NUMBER_REQUEST:
    case GET_BREEDING_FEE_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case GET_BLOCK_NUMBER_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          blockNumber: action.payload.blockNumber
        },
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case GET_BREEDING_FEE_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          breedingFee: action.payload.breedingFee
        },
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case GET_BLOCK_NUMBER_FAILURE:
    case GET_BREEDING_FEE_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    default:
      return state
  }
}
