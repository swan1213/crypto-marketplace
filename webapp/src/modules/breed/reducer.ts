import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import { ChangeAccountAction, CHANGE_ACCOUNT } from '@kmon/dapps/dist/modules/wallet/actions'
import { FetchNFTFailureAction, FetchNFTRequestAction, FetchNFTSuccessAction, FETCH_NFT_FAILURE, FETCH_NFT_REQUEST, FETCH_NFT_SUCCESS } from '../nft/actions'

import { NFT } from '../nft/types'
import {
  BreedFailureAction,
  BreedRequestAction,
  BreedSuccessAction,
  BREED_FAILURE,
  BREED_REQUEST,
  BREED_SUCCESS,
  CancelBreedFailureAction,
  CancelBreedRequestAction,
  CancelBreedSuccessAction,
  CANCEL_BREED_FAILURE,
  CANCEL_BREED_REQUEST,
  CANCEL_BREED_SUCCESS,
  ResetNFTForBreedingRequestAction,
  ResetSelectedNFTForBreedingRequestAction,
  RESET_NFT_FOR_BREEDING_REQUEST,
  RESET_SELECTED_NFT_FOR_BREEDING_REQUEST,
  SelectNFTForBreedingRequestAction,
  SELECT_NFT_FOR_BREEDING_REQUEST,
  SimulateBreedingFailureAction,
  SimulateBreedingRequestAction,
  SimulateBreedingSuccessAction,
  SIMULATE_BREEDING_FAILURE,
  SIMULATE_BREEDING_REQUEST,
  SIMULATE_BREEDING_SUCCESS
} from './actions'
import { GenesV2 } from './types'

export type BreedState = {
  data: {
    myNFT: NFT | null,
    selectedNFT: NFT | null,
    simulatedGenes: GenesV2 | null
  }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {
    myNFT: null,
    selectedNFT: null,
    simulatedGenes: null
  },
  loading: [],
  error: null
}

type NFTReducerAction =
  | FetchNFTRequestAction
  | FetchNFTSuccessAction
  | FetchNFTFailureAction
  | ResetNFTForBreedingRequestAction
  | SelectNFTForBreedingRequestAction
  | ResetSelectedNFTForBreedingRequestAction
  | SimulateBreedingRequestAction
  | SimulateBreedingSuccessAction
  | SimulateBreedingFailureAction
  | BreedRequestAction
  | BreedSuccessAction
  | BreedFailureAction
  | CancelBreedRequestAction
  | CancelBreedSuccessAction
  | CancelBreedFailureAction
  | ChangeAccountAction

export function breedReducer(
  state: BreedState = INITIAL_STATE,
  action: NFTReducerAction
) {
  switch (action.type) {
    case FETCH_NFT_REQUEST:
    case SIMULATE_BREEDING_REQUEST:
    case BREED_REQUEST:
    case CANCEL_BREED_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_NFT_FAILURE:
    case SIMULATE_BREEDING_FAILURE:
    case BREED_FAILURE:
    case CANCEL_BREED_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case FETCH_NFT_SUCCESS: {
      const { nft } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          myNFT: nft
        },
        error: null
      }
    }
    case RESET_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          myNFT: null
        }
      }
    }
    case SELECT_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          selectedNFT: action.payload.nft
        }
      }
    }
    case RESET_SELECTED_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          selectedNFT: null
        }
      }
    }
    case SIMULATE_BREEDING_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          simulatedGenes: action.payload.genes
        },
        error: null
      }
    case BREED_SUCCESS:
    case CANCEL_BREED_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case CHANGE_ACCOUNT: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
