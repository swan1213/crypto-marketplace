import { all, takeEvery, put } from 'redux-saga/effects'
import { toastSaga as baseToastSaga } from '@kmon/dapps/dist/modules/toast/sagas'
import { showToast } from '@kmon/dapps/dist/modules/toast/actions'
import { getChainConfiguration } from '@kmon/dapps/dist/lib/chainConfiguration'
import { getBreedFailureToast, getMetaTransactionFailureToast } from './toasts'
import { TransferNFTFailureAction, TRANSFER_NFT_FAILURE } from '../nft/actions'
import { Network } from '@kmon/schemas'
import {
  CancelOrderFailureAction,
  CANCEL_ORDER_FAILURE,
  CreateOrderFailureAction,
  CREATE_ORDER_FAILURE,
  ExecuteOrderFailureAction,
  EXECUTE_ORDER_FAILURE
} from '../order/actions'
import {
  GrantTokenFailureAction,
  GRANT_TOKEN_FAILURE,
  RevokeTokenFailureAction,
  REVOKE_TOKEN_FAILURE
} from '@kmon/dapps/dist/modules/authorization/actions'
import { BreedFailureAction, BREED_FAILURE } from '../breed/actions'

export function* toastSaga() {
  yield all([baseToastSaga(), customToastSaga()])
}

function* customToastSaga() {
  yield takeEvery(TRANSFER_NFT_FAILURE, handleNFTMetaTransactionFailure)
  yield takeEvery(CREATE_ORDER_FAILURE, handleNFTMetaTransactionFailure)
  yield takeEvery(EXECUTE_ORDER_FAILURE, handleNFTMetaTransactionFailure)
  yield takeEvery(CANCEL_ORDER_FAILURE, handleNFTMetaTransactionFailure)

  yield takeEvery(
    GRANT_TOKEN_FAILURE,
    handleAuthorizationMetaTransactionFailure
  )
  yield takeEvery(
    REVOKE_TOKEN_FAILURE,
    handleAuthorizationMetaTransactionFailure
  )

  yield takeEvery(BREED_FAILURE, handleBreedFailure)
}

function* handleNFTMetaTransactionFailure(
  action:
    | TransferNFTFailureAction
    | CreateOrderFailureAction
    | ExecuteOrderFailureAction
    | CancelOrderFailureAction
) {
  const { nft, error } = action.payload

  // if (!isUserDeniedSignature(error)) {
  //   yield put(showToast(getMetaTransactionFailureToast()))
  // }
}

function* handleAuthorizationMetaTransactionFailure(
  action: GrantTokenFailureAction | RevokeTokenFailureAction
) {
  const { authorization, error } = action.payload

  const { network } = getChainConfiguration(authorization.chainId)
  if (!isUserDeniedSignature(error)) {
    // yield put(showToast(getMetaTransactionFailureToast()))
  }
}

function isUserDeniedSignature(message: string) {
  return message.indexOf('User denied message signature') !== -1
}

function* handleBreedFailure(action: BreedFailureAction) {
  const { error } = action.payload
  // @ts-ignore
  if (error && error.message) {
    // @ts-ignore
    yield put(showToast(getBreedFailureToast(error.message)))
  } else {
    yield put(showToast(getBreedFailureToast("Something went wrong")))
  }
}
