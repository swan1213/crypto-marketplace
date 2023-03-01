import { put, call, takeEvery, select, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import { ChainId } from '@kmon/schemas'
import {
  BuyItemRequestAction,
  buyItemSuccess,
  buyItemFailure,
  BUY_ITEM_REQUEST,
  FETCH_ITEMS_REQUEST,
  fetchItemsSuccess,
  fetchItemsFailure,
  FETCH_ITEM_REQUEST,
  fetchItemFailure,
  fetchItemsRequest,
  BUY_ITEM_WITH_CANDIES_REQUEST,
  BuyItemWithCandiesRequestAction,
  buyItemWithCandiesSuccess,
  buyItemWithCandiesFailure,
} from './actions'
import { locations } from '../routing/locations'
import { fetchItems, buyItem, fetchItemsWithCandies, buyItemWithCandies } from './utils'
import { getWallet } from '../wallet/selectors'
import { getData as getItems } from './selectors'
import { Item } from './types'

export function* itemSaga() {
  yield takeEvery(FETCH_ITEMS_REQUEST, handleFetchItemsRequest)
  yield takeEvery(FETCH_ITEM_REQUEST, handleFetchItemRequest)
  yield takeEvery(BUY_ITEM_REQUEST, handleBuyItemRequest)
  yield takeEvery(BUY_ITEM_WITH_CANDIES_REQUEST, handleBuyItemWithCandiesRequest)
}

function* handleFetchItemsRequest() {
  try {
    const [items, itemsWithCandies]: [Item[], Item[]] = yield all([
      call(fetchItems),
      call(fetchItemsWithCandies)
    ])
    for (let i = 0; i < items.length; i++) {
      const itemWithCandy = itemsWithCandies.find((item) => item.name === items[i].name)
      if (itemWithCandy) {
        items[i].priceWithCandies = itemWithCandy.price
      }
    }
    yield put(fetchItemsSuccess(items))
  } catch (error) {
    // @ts-ignore
    yield put(fetchItemsFailure(error.message))
  }
}

function* handleFetchItemRequest() {
  try {
    const items: Item[] = yield select(getItems)
    if (items.length === 0) {
      yield put(fetchItemsRequest())
    }
  } catch (error) {
    // @ts-ignore
    yield put(fetchItemFailure(error.message))
  }
}

function* handleBuyItemRequest(action: BuyItemRequestAction) {
  const { version, item, count, to } = action.payload
  try {
    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(buyItem, wallet, version, item.itemId, count, to)
    yield put(buyItemSuccess(chainId, txHash, item, count, to))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(buyItemFailure(item.itemId, error.message))
  }
}

function* handleBuyItemWithCandiesRequest(action: BuyItemWithCandiesRequestAction) {
  const { version, item, count, to } = action.payload
  try {
    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(buyItemWithCandies, wallet, item.itemId, item.priceWithCandies, count, to)
    yield put(buyItemWithCandiesSuccess(chainId, txHash, item, count, to))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(buyItemWithCandiesFailure(item.itemId, error.message))
  }
}
