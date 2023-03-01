import { connect } from 'react-redux'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'
import {
  isConnected
} from '@kmon/dapps/dist/modules/wallet/selectors'

import { RootState } from '../../modules/reducer'
import { FETCH_NFTS_REQUEST } from '../../modules/nft/actions'
import { browseNFTs } from '../../modules/routing/actions'
import { getNFTs, getCount } from '../../modules/ui/nft/browse/selectors'
import { getVendor, getPage, getPathname } from '../../modules/routing/selectors'
import { getLoading } from '../../modules/nft/selectors'
import { MapStateProps, MapDispatch, MapDispatchProps } from './NFTList.types'
import NFTList from './NFTList'
import { getSubgraphBlockNumber } from '../../modules/subgraph/selectors'
import { getMyNFT } from '../../modules/breed/selectors'

const mapState = (state: RootState): MapStateProps => ({
  vendor: getVendor(state),
  nfts: getNFTs(state),
  page: getPage(state),
  count: getCount(state),
  subgraphBlockNumber: getSubgraphBlockNumber(state),
  isLoading: isLoadingType(getLoading(state), FETCH_NFTS_REQUEST),
  isSignedIn: isConnected(state),
  myNFT: getMyNFT(state),
  pathname: getPathname(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onBrowse: options => dispatch(browseNFTs(options))
})

export default connect(mapState, mapDispatch)(NFTList)
