import { call, put, takeEvery } from "redux-saga/effects"

import {
  addToBreedigCentreSuccess,
  addToBreedingCentreFailure,
  AddToBreedingCentreRequestAction,
  ADD_TO_BREEDING_CENTRE_REQUEST,
} from "./actions"
import { addToBreedingCentre } from "./utils"
import { push } from "connected-react-router"
import { locations } from "../routing/locations"

export function* breedingOrderSaga() {
  yield takeEvery(ADD_TO_BREEDING_CENTRE_REQUEST, handleAddToBreedingCentre)
}

function* handleAddToBreedingCentre(action: AddToBreedingCentreRequestAction) {
  const { contractAddress, tokenId, price } = action.payload

  try {
    yield call(addToBreedingCentre, tokenId, price)
    yield put(addToBreedigCentreSuccess())
    yield put(push(locations.breed(contractAddress, tokenId)))
  } catch (error) {
    // @ts-ignore
    yield put(addToBreedingCentreFailure(tokenId, error.message))
  }
}
