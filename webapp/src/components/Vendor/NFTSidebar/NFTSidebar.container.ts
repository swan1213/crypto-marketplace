import { connect } from 'react-redux'

import { RootState } from '../../../modules/reducer'
import { browseNFTs } from '../../../modules/routing/actions'
import {
  getVendor,
  getSection,
  getPathname,
  getElemTypes,
  getAffection,
  getSpecialties,
  getSuper,
  getBraveness,
  getConstitution,
  getCraziness,
  getElementStartingTalent,
  getHunger,
  getInstinct,
  getLaziness,
  getSmart,
  getBodySize,
  getEgo,
  getHealthPoints,
  getSpeed,
  getSex,
  getSkinType,
  getWater,
  getArrayByType,
  getGeneration,
  getKryptomonStatus
} from '../../../modules/routing/selectors'
import {
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './NFTSidebar.types'
import NFTSidebar from './NFTSidebar'
import { MultipleFilters } from './NFTSidebar'
import { getMyNFT } from '../../../modules/breed/selectors'
import { getAddress } from '../../../modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => ({
  vendor: getVendor(state),
  section: getSection(state),
  pathname: getPathname(state),
  elemTypes: getElemTypes(state),
  generation: getGeneration(state),
  affection: getAffection(state),
  specialties: getSpecialties(state),
  supers: getSuper(state),
  braveness: getBraveness(state),
  constitution: getConstitution(state),
  craziness: getCraziness(state),
  hunger: getHunger(state),
  instinct: getInstinct(state),
  smart: getSmart(state),
  elementStartingTalent: getElementStartingTalent(state),
  laziness: getLaziness(state),
  bodySize: getBodySize(state),
  ego: getEgo(state),
  healthPoints: getHealthPoints(state),
  speed: getSpeed(state),
  sex: getSex(state),
  skinType: getSkinType(state),
  water: getArrayByType('water')(state),
  waterTalent: getArrayByType('waterTalent')(state),
  fire: getArrayByType('fire')(state),
  fireTalent: getArrayByType('fireTalent')(state),
  ground: getArrayByType('ground')(state),
  groundTalent: getArrayByType('groundTalent')(state),
  ice: getArrayByType('ice')(state),
  iceTalent: getArrayByType('iceTalent')(state),
  grass: getArrayByType('grass')(state),
  grassTalent: getArrayByType('grassTalent')(state),
  electro: getArrayByType('electro')(state),
  electroTalent: getArrayByType('electroTalent')(state),
  ghost: getArrayByType('ghost')(state),
  ghostTalent: getArrayByType('ghostTalent')(state),
  air: getArrayByType('air')(state),
  airTalent: getArrayByType('airTalent')(state),
  color: getArrayByType('color')(state),
  attack: getArrayByType('attack')(state),
  defence: getArrayByType('defence')(state),
  generalTalent: getArrayByType('generalTalent')(state),
  growthTalentFactor: getArrayByType('growthTalentFactor')(state),
  elementPercentage: getArrayByType('elementPercentage')(state),
  special: getArrayByType('special')(state),
  price: getArrayByType('price')(state),
  priceToken: getArrayByType('priceToken')(state),
  kryptomonStatus: getKryptomonStatus(state),
  unfreezable: getArrayByType('unfreezable')(state),
  myNFT: getMyNFT(state),
  address: getAddress(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onBrowse: (options: MultipleFilters) => {
    return dispatch(browseNFTs(options))
  }
})

export default connect(mapState, mapDispatch)(NFTSidebar)
