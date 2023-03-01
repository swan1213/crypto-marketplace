import { connect } from 'react-redux'

import { RootState } from '../../../../modules/reducer'
import { getCount } from '../../../../modules/ui/nft/browse/selectors'
import {
  getSection,
  getSortBy,
  getOnlyOnSale,
  getIsMap,
  getWearableRarities,
  getSearch,
  getContracts,
  getNetwork,
  getPriceToken
} from '../../../../modules/routing/selectors'
import { MapStateProps } from './NFTFilters.types'
import NFTFilters from './NFTFilters'

const mapState = (state: RootState): MapStateProps => ({
  count: getCount(state),
  section: getSection(state),
  sortBy: getSortBy(state),
  priceToken: getPriceToken(state),
  search: getSearch(state),
  onlyOnSale: getOnlyOnSale(state),
  isMap: getIsMap(state),
  wearableRarities: getWearableRarities(state),
  contracts: getContracts(state),
  network: getNetwork(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(NFTFilters)
