import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'
import { Address } from 'web3x-es/address'
import {
  getData as getAuthorizations,
  getLoading as getLoadingAuthorizations
} from '@kmon/dapps/dist/modules/authorization/selectors'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'
import { FETCH_AUTHORIZATIONS_REQUEST } from '@kmon/dapps/dist/modules/authorization/actions'

import { RootState } from '../../../modules/reducer'
import {
  getWallet,
  isConnecting
} from '../../../modules/wallet/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxDetail.types'
import LootboxDetail from './LootboxDetail'
import {
  buyItemRequest,
  fetchItemRequest,
  BUY_ITEM_REQUEST,
  buyItemWithCandiesRequest
} from '../../../modules/item/actions'
import {
  getCurrentItem,
  getLoading as getLoadingItem
} from '../../../modules/item/selectors'
import { Item } from '../../../modules/item/types'
import { ItemVersion } from '../../../modules/item/types'

const mapState = (
  state: RootState,
  ownProps: RouteComponentProps<Params>
): MapStateProps => {
  const { address, id } = ownProps.match.params

  return ({
    address: address?.toLowerCase(),
    wallet: getWallet(state),
    authorizations: getAuthorizations(state),
    isConnecting: isConnecting(state),
    isLoading: isLoadingType(getLoadingAuthorizations(state), FETCH_AUTHORIZATIONS_REQUEST),
    isBuyingItem: isLoadingType(getLoadingItem(state), BUY_ITEM_REQUEST),
    itemId: id,
    currentItem: getCurrentItem(state)
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchItem: () => dispatch(fetchItemRequest()),
  onBuyItem: (version: ItemVersion, item: Item, count: number, to: Address) =>
    dispatch(buyItemRequest(version, item, count, to)),
  onBuyItemWithCandies: (version: ItemVersion, item: Item, count: number, to: Address) =>
    dispatch(buyItemWithCandiesRequest(version, item, count, to)),
})

export default connect(mapState, mapDispatch)(LootboxDetail)
