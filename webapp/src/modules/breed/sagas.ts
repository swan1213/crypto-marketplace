import { call, put, takeEvery } from "redux-saga/effects"
import { push, replace } from "connected-react-router"

import {
  breedFailure,
  BreedRequestAction,
  breedSuccess,
  BREED_REQUEST,
  cancelBreedFailure,
  CancelBreedRequestAction,
  cancelBreedSuccess,
  CANCEL_BREED_REQUEST,
  simulateBreedingFailure,
  SimulateBreedingRequestAction,
  simulateBreedingSuccess,
  SIMULATE_BREEDING_REQUEST,
} from "./actions"
import { breed, cancelBreed, simulateBreeding } from "./utils"
import { locations } from "../routing/locations"
import { GenesV2 } from "./types"
import { showBreedPriceModal } from "../ui/actions"
import { fetchNFTRequest } from "../nft/actions"

export function* breedSaga() {
  yield takeEvery(SIMULATE_BREEDING_REQUEST, handleSimulateBreeding)
  yield takeEvery(BREED_REQUEST, handleBreedRequest)
  yield takeEvery(CANCEL_BREED_REQUEST, handleCancelBreedRequest)
}

function* handleSimulateBreeding(action: SimulateBreedingRequestAction) {
  const { femaleTokenId, maleTokenId } = action.payload

  try {
    const genes: GenesV2 = yield call(simulateBreeding, femaleTokenId, maleTokenId)
    yield put(simulateBreedingSuccess(genes))
  } catch (error) {
    // @ts-ignore
    yield put(simulateBreedingFailure(femaleTokenId, maleTokenId, error.message))
  }
}

function* handleBreedRequest(action: BreedRequestAction) {
  const { femaleTokenId, maleTokenId } = action.payload

  try {
    yield call(breed, femaleTokenId, maleTokenId)
    yield put(breedSuccess())
    yield put(replace(locations.currentAccount()))
  } catch (error) {
    // @ts-ignore
    yield put(breedFailure(femaleTokenId, maleTokenId, error.error))
  }
}

function* handleCancelBreedRequest(action: CancelBreedRequestAction) {
  const { contractAddress, tokenId } = action.payload

  try {
    yield call(cancelBreed, tokenId)
    yield put(cancelBreedSuccess())
    yield put(showBreedPriceModal(false))
    yield put(fetchNFTRequest(contractAddress, tokenId))
  } catch (error) {
    // @ts-ignore
    yield put(cancelBreedFailure(error.message))
  }
}
