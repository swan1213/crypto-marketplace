import { connect } from 'react-redux'
import {
  isConnected
} from '@kmon/dapps/dist/modules/wallet/selectors'

import { RootState } from '../../modules/reducer'
import { MapStateProps, MapDispatchProps } from './Banner.types'
import Banner from './Banner'
import { getSubgraphBlockNumber } from '../../modules/subgraph/selectors'

const mapState = (state: RootState): MapStateProps => {
  return {
    isSignedIn: isConnected(state),
    subgraphBlockNumber: getSubgraphBlockNumber(state)
  }
}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(Banner)
