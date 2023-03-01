import { put, call, takeEvery, delay, select } from 'redux-saga/effects'
import { CONNECT_WALLET_SUCCESS } from '@kmon/dapps/dist/modules/wallet/actions'
import {
  isConnected
} from '@kmon/dapps/dist/modules/wallet/selectors'

import {
  getBlockNumberSuccess,
  getBlockNumberFailure,
  GET_BLOCK_NUMBER_REQUEST,
  getBlockNumberRequest,
  GET_BREEDING_FEE_REQUEST,
  getBreedingFeeFailure,
  getBreedingFeeSuccess,
} from './actions'
import { BlockNumberType, BreedingFeeType } from './types'
import { subgraphAPI } from './api'

export function* subgraphSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeEvery(GET_BLOCK_NUMBER_REQUEST, handleFetchGetBlockNumberRequest)
  yield takeEvery(GET_BREEDING_FEE_REQUEST, handleGetBreedingFeeRequest)
}

function* handleConnectWalletSuccess() {
  while(true) {
    const isSigned: boolean = yield select(isConnected)
    if (isSigned) {
      yield put(getBlockNumberRequest())
      yield delay(30000)
    }
  }
}

function* handleFetchGetBlockNumberRequest() {
  try {
    const { data }: { data: BlockNumberType } = yield call(subgraphAPI.getBlockNumber)
    yield put(getBlockNumberSuccess(data._meta.block.number))
  } catch (error) {
    // @ts-ignore
    yield put(getBlockNumberFailure(error.message))
  }
}

function* handleGetBreedingFeeRequest() {
  try {
    const { data }: { data: BreedingFeeType } = yield call(subgraphAPI.getBredingFee)
    yield put(getBreedingFeeSuccess(data.breedingCentres[0].breedingFee))
  } catch (error) {
    // @ts-ignore
    yield put(getBreedingFeeFailure(error.message))
  }
}
