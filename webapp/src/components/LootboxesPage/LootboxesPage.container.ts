import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'

import { RootState } from '../../modules/reducer'
import { getIsFullscreen } from '../../modules/routing/selectors'
import {
  getWallet,
} from '../../modules/wallet/selectors'
import { getData as getItems } from '../../modules/item/selectors'
import {isConnecting} from '@kmon/dapps/dist/modules/wallet/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxesPage.types'
import LootboxesPage from './LootboxesPage'
import { fetchItemsRequest } from '../../modules/item/actions'

const mapState = (
  state: RootState
): MapStateProps => {

  return ({
    wallet: getWallet(state),
    isConnecting: isConnecting(state),
    isFullscreen: getIsFullscreen(state),
    items: getItems(state),
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchItems: () => dispatch(fetchItemsRequest())
})

export default connect(mapState, mapDispatch)(LootboxesPage)
