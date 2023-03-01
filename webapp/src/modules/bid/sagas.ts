import { push } from 'connected-react-router'
import { ChainId } from '@kmon/schemas'
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import { takeEvery, put, select, call, all } from 'redux-saga/effects'
import {
  PLACE_BID_REQUEST,
  PlaceBidRequestAction,
  placeBidFailure,
  placeBidSuccess,
  FETCH_BIDS_BY_ADDRESS_REQUEST,
  fetchBidsByAddressSuccess,
  fetchBidsByAddressFailure,
  FetchBidsByAddressRequestAction,
  ACCEPT_BID_REQUEST,
  CANCEL_BID_REQUEST,
  AcceptBidRequestAction,
  acceptBidSuccess,
  acceptBidFailure,
  CancelBidRequestAction,
  cancelBidSuccess,
  cancelBidFailure,
  FETCH_BIDS_BY_NFT_REQUEST,
  FetchBidsByNFTRequestAction,
  fetchBidsByNFTSuccess,
  fetchBidsByNFTFailure
} from './actions'
import { getWallet } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'
import { getContract } from '../contract/utils'
import { VendorName } from '../vendor/types'
import { Bid } from './types'

export function* bidSaga() {
  yield takeEvery(PLACE_BID_REQUEST, handlePlaceBidRequest)
  yield takeEvery(ACCEPT_BID_REQUEST, handleAcceptBidRequest)
  yield takeEvery(CANCEL_BID_REQUEST, handleCancelBidRequest)
  yield takeEvery(
    FETCH_BIDS_BY_ADDRESS_REQUEST,
    handleFetchBidsByAddressRequest
  )
  yield takeEvery(FETCH_BIDS_BY_NFT_REQUEST, handleFetchBidsByNFTRequest)
}

function* handlePlaceBidRequest(action: PlaceBidRequestAction) {
  const { nft, price, paymentToken, expiresAt, fingerprint } = action.payload
  try {
    const { bidService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() =>
      bidService!.place(wallet, nft, price, paymentToken, expiresAt, fingerprint)
    )
    const chainId: ChainId = yield select(getChainId)
    yield put(
      placeBidSuccess(
        nft,
        price,
        paymentToken,
        expiresAt,
        chainId,
        txHash,
        wallet!.address,
        fingerprint
      )
    )
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(placeBidFailure(nft, price, paymentToken, expiresAt, error, fingerprint))
  }
}

function* handleAcceptBidRequest(action: AcceptBidRequestAction) {
  const { bid } = action.payload
  try {
    const contract = getContract({ address: bid.contractAddress })
    if (!contract.vendor) {
      throw new Error(
        `Couldn't find a valid vendor for contract ${contract.address}`
      )
    }
    const { bidService } = VendorFactory.build(contract.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() => bidService!.accept(wallet, bid))

    const chainId: ChainId = yield select(getChainId)
    yield put(acceptBidSuccess(bid, chainId, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(acceptBidFailure(bid, error.message))
  }
}

function* handleCancelBidRequest(action: CancelBidRequestAction) {
  const { bid } = action.payload
  try {
    const contract = getContract({ address: bid.contractAddress })
    if (!contract.vendor) {
      throw new Error(
        `Couldn't find a valid vendor for contract ${contract.address}`
      )
    }
    const { bidService } = VendorFactory.build(contract.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)
    const txHash: string = yield call(() => bidService!.cancel(wallet, bid))

    yield put(cancelBidSuccess(bid, chainId, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(cancelBidFailure(bid, error.message))
  }
}

function* handleFetchBidsByAddressRequest(
  action: FetchBidsByAddressRequestAction
) {
  const { address } = action.payload
  try {
    let sellerBids: Bid[] = []
    let bidderBids: Bid[] = []

    for (const vendorName of Object.values(VendorName)) {
      const { bidService } = VendorFactory.build(vendorName)
      if (bidService === undefined) {
        continue
      }

      [sellerBids, bidderBids] = yield all([
        bidService.fetchBySeller(address),
        bidService.fetchByBidder(address)
      ])
    }

    yield put(fetchBidsByAddressSuccess(address, sellerBids, bidderBids))
  } catch (error) {
    // @ts-ignore
    yield put(fetchBidsByAddressFailure(address, error.message))
  }
}

function* handleFetchBidsByNFTRequest(action: FetchBidsByNFTRequestAction) {
  const { nft } = action.payload
  try {
    const { bidService } = VendorFactory.build(nft.vendor)

    const bids: Bid[] = yield call(() => bidService!.fetchByNFT(nft))

    yield put(fetchBidsByNFTSuccess(nft, bids))
  } catch (error) {
    // @ts-ignore
    yield put(fetchBidsByNFTFailure(nft, error.message))
  }
}
