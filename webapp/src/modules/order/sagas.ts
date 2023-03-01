import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  CREATE_ORDER_REQUEST,
  CreateOrderRequestAction,
  createOrderFailure,
  createOrderSuccess,
  EXECUTE_ORDER_REQUEST,
  executeOrderSuccess,
  executeOrderFailure,
  ExecuteOrderRequestAction,
  CANCEL_ORDER_REQUEST,
  CancelOrderRequestAction,
  cancelOrderSuccess,
  cancelOrderFailure
} from './actions'
import { getWallet } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'

export function* orderSaga() {
  yield takeEvery(CREATE_ORDER_REQUEST, handleCreateOrderRequest)
  yield takeEvery(EXECUTE_ORDER_REQUEST, handleExecuteOrderRequest)
  yield takeEvery(CANCEL_ORDER_REQUEST, handleCancelOrderRequest)
}

function* handleCreateOrderRequest(action: CreateOrderRequestAction) {
  const { nft, price, paymentToken, expiresAt } = action.payload
  try {
    const { orderService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() =>
      orderService.create(wallet, nft, price, paymentToken, expiresAt)
    )
    yield put(createOrderSuccess(nft, price, paymentToken, expiresAt, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(createOrderFailure(nft, price, expiresAt, error.message))
  }
}

function* handleExecuteOrderRequest(action: ExecuteOrderRequestAction) {
  const { order, nft, paymentToken, fingerprint } = action.payload
  try {
    if (
      nft.contractAddress !== order.contractAddress &&
      nft.tokenId !== order.tokenId
    ) {
      throw new Error('The order does not match the NFT')
    }
    const { orderService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() =>
      orderService.execute(wallet, nft, order, paymentToken, fingerprint)
    )

    yield put(executeOrderSuccess(order, nft, paymentToken, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(executeOrderFailure(order, nft, error.message))
  }
}

function* handleCancelOrderRequest(action: CancelOrderRequestAction) {
  const { order, nft } = action.payload
  try {
    if (
      nft.contractAddress !== order.contractAddress &&
      nft.tokenId !== order.tokenId
    ) {
      throw new Error('The order does not match the NFT')
    }
    const { orderService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() => orderService.cancel(wallet, nft))
    yield put(cancelOrderSuccess(order, nft, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(cancelOrderFailure(order, nft, error.message))
  }
}
