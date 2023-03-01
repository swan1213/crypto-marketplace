import {
  FetchNFTsSuccessAction,
  FETCH_NFTS_SUCCESS
} from '../../../nft/actions'
import { View } from '../../types'

export type HomepageUIState = {
  [View.KRYPTOMONS]: string[]
  // [View.LATEST_SOLD]: string[]
  [View.ALL_ASSETS]: string[]
}

const INITIAL_STATE: HomepageUIState = {
  [View.KRYPTOMONS]: [],
  // [View.LATEST_SOLD]: [],
  [View.ALL_ASSETS]: []
}

type UIReducerAction = FetchNFTsSuccessAction

export function homepageReducer(
  state: HomepageUIState = INITIAL_STATE,
  action: UIReducerAction
) {
  switch (action.type) {
    case FETCH_NFTS_SUCCESS: {
      const nftIds = action.payload.nfts.map(nft => nft.id)
      switch (action.payload.options.view) {
        case View.KRYPTOMONS: {
          return {
            ...state,
            [View.KRYPTOMONS]: nftIds
          }
        }
        case View.ALL_ASSETS: {
          return {
            ...state,
            [View.ALL_ASSETS]: nftIds
          }
        }
        // case View.LATEST_SOLD: {
        //   return {
        //     ...state,
        //     [View.LATEST_SOLD]: nftIds
        //   }
        // }
        default: {
          return {
            ...state
          }
        }
      }
    }
    default:
      return state
  }
}
