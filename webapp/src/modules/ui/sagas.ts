import { takeEvery, put, select, call } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccessAction
} from '@kmon/dapps/dist/modules/wallet/actions'
import { push, getLocation } from 'connected-react-router'
import { locations } from '../routing/locations'
import { getReturnPath } from '../routing/selectors'

export function* uiSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  const location: ReturnType<typeof getLocation> = yield select(getLocation)
  const returnPath: string | null = yield select(getReturnPath)

  if (location.pathname === locations.signIn()) {
    if (returnPath === null) {
      yield put(push(locations.currentAccount()))
    } else if (returnPath === 'items') {
      yield put(push(locations.items()))
    }
  }
}
