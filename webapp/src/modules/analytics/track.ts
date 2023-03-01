import {
  EventName,
  GetPayload
} from '@kmon/dapps/dist/modules/analytics/types'
import {
  FETCH_TRANSACTION_FAILURE,
  FIX_REVERTED_TRANSACTION,
  REPLACE_TRANSACTION_SUCCESS,
  FetchTransactionFailureAction,
  FixRevertedTransactionAction,
  ReplaceTransactionSuccessAction
} from '@kmon/dapps/dist/modules/transaction/actions'
import {
  GrantTokenSuccessAction,
  GRANT_TOKEN_SUCCESS,
  RevokeTokenSuccessAction,
  REVOKE_TOKEN_SUCCESS
} from '@kmon/dapps/dist/modules/authorization/actions'
import { TransactionStatus } from '@kmon/dapps/dist/modules/transaction/types'
import { add } from '@kmon/dapps/dist/modules/analytics/utils'
import { PayloadAction } from 'typesafe-actions'
import { capitalize } from '../../lib/text'
import {
  EXECUTE_ORDER_SUCCESS,
  CREATE_ORDER_SUCCESS,
  CANCEL_ORDER_SUCCESS,
  ExecuteOrderSuccessAction,
  CreateOrderSuccessAction,
  CancelOrderSuccessAction
} from '../order/actions'
import {
  TRANSFER_NFT_SUCCESS,
  TransferNFTSuccessAction,
  FETCH_NFTS_SUCCESS,
  FetchNFTsSuccessAction
} from '../nft/actions'
import {
  PLACE_BID_SUCCESS,
  ACCEPT_BID_SUCCESS,
  CANCEL_BID_SUCCESS,
  ARCHIVE_BID,
  UNARCHIVE_BID,
  PlaceBidSuccessAction,
  AcceptBidSuccessAction,
  CancelBidSuccessAction,
  ArchiveBidAction,
  UnarchiveBidAction
} from '../bid/actions'
import {
  BUY_ITEM_SUCCESS,
  BuyItemSuccessAction,
} from '../item/actions'

function track<T extends PayloadAction<string, any>>(
  actionType: string,
  eventName: string | ((action: T) => string),
  getPayload = (action: T) => action.payload
) {
  add(actionType, eventName as EventName, getPayload as GetPayload)
}

function withCategory(eventName: string, item: { category: string }) {
  const category = capitalize(item.category)
  return `${eventName} ${category}`
}

track<BuyItemSuccessAction>(
  BUY_ITEM_SUCCESS,
  ({ payload }) => withCategory('Buy Item', { category: payload.item.name }),
  ({ payload }) => ({
    name: payload.item.name,
    price: payload.item.price,
    count: payload.count,
    to: payload.to
  })
)

track<ExecuteOrderSuccessAction>(
  EXECUTE_ORDER_SUCCESS,
  ({ payload }) => withCategory('Buy', payload.nft),
  ({ payload }) => ({
    category: payload.nft.category,
    nft: payload.nft.id,
    price: payload.order.price,
    paymentToken: payload.order.paymentToken,
    seller: payload.order.owner,
    buyer: payload.order.buyer
  })
)

track<CreateOrderSuccessAction>(
  CREATE_ORDER_SUCCESS,
  ({ payload }) => withCategory('Publish', payload.nft),
  ({ payload }) => ({
    category: payload.nft.category,
    tokenId: payload.nft.tokenId,
    price: payload.price,
    paymentToken: payload.paymentToken,
  })
)

track<CancelOrderSuccessAction>(
  CANCEL_ORDER_SUCCESS,
  ({ payload }) => withCategory('Cancel Sale', payload.nft),
  ({ payload }) => ({
    category: payload.nft.category,
    tokenId: payload.nft.tokenId,
    price: payload.order.price,
    paymentToken: payload.order.paymentToken
  })
)

track<TransferNFTSuccessAction>(
  TRANSFER_NFT_SUCCESS,
  ({ payload }) => withCategory('Transfer NFT', payload.nft),
  ({ payload }) => ({
    category: payload.nft.category,
    tokenId: payload.nft.tokenId,
    to: payload.address
  })
)

track<FetchTransactionFailureAction>(FETCH_TRANSACTION_FAILURE, ({ payload }) =>
  payload.status === TransactionStatus.REVERTED
    ? 'Transaction Failed'
    : 'Transaction Dropped'
)

track<FixRevertedTransactionAction>(
  FIX_REVERTED_TRANSACTION,
  'Transaction Fixed'
)

track<ReplaceTransactionSuccessAction>(
  REPLACE_TRANSACTION_SUCCESS,
  'Transaction Replaced'
)

track<GrantTokenSuccessAction>(GRANT_TOKEN_SUCCESS, () => 'Authorize')

track<RevokeTokenSuccessAction>(REVOKE_TOKEN_SUCCESS, () => 'Unauthorize')

track<PlaceBidSuccessAction>(
  PLACE_BID_SUCCESS,
  ({ payload }) => withCategory('Bid', payload.nft),
  ({ payload }) => ({
    category: payload.nft.category,
    tokenId: payload.nft.tokenId,
    price: payload.price,
    paymentToken: payload.paymentToken,
    bidder: payload.bidder
  })
)

track<AcceptBidSuccessAction>(
  ACCEPT_BID_SUCCESS,
  'Accept bid',
  ({ payload }) => ({
    tokenId: payload.bid.tokenId,
    bidId: payload.bid.id,
    bidder: payload.bid.bidder,
    seller: payload.bid.seller,
    price: payload.bid.price,
    paymentToken: payload.bid.paymentToken
  })
)

track<CancelBidSuccessAction>(
  CANCEL_BID_SUCCESS,
  'Cancel bid',
  ({ payload }) => ({
    tokenId: payload.bid.tokenId,
    bidId: payload.bid.id,
    bidder: payload.bid.bidder
  })
)

track<ArchiveBidAction>(ARCHIVE_BID, 'Archive Bid', ({ payload }) => ({
  tokenId: payload.bid.tokenId,
  bidId: payload.bid.id,
  price: payload.bid.price,
  paymentToken: payload.bid.paymentToken
}))

track<UnarchiveBidAction>(UNARCHIVE_BID, 'Unarchive Bid', ({ payload }) => ({
  tokenId: payload.bid.tokenId,
  bidId: payload.bid.id,
  price: payload.bid.price,
  paymentToken: payload.bid.paymentToken
}))

track<FetchNFTsSuccessAction>(
  FETCH_NFTS_SUCCESS,
  'Fetch NFTs',
  ({ payload }) => ({
    ...payload.options.params,
    view: payload.options.view,
    vendor: payload.options.vendor,
    count: payload.count
  })
)
