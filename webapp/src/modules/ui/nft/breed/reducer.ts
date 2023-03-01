import { ShowBreedPriceModalAction, SHOW_BREED_PRICE_MODAL } from '../../actions'

export type BreedUIState = {
  showBreedPriceModal: boolean
}

const INITIAL_STATE: BreedUIState = {
  showBreedPriceModal: false
}

type UIReducerAction = ShowBreedPriceModalAction

export function breedReducer(
  state: BreedUIState = INITIAL_STATE,
  action: UIReducerAction
): BreedUIState {
  switch (action.type) {
    case SHOW_BREED_PRICE_MODAL: {
      return {
        ...state,
        showBreedPriceModal: action.payload.show
      }
    }
    default:
      return state
  }
}
