import { createSelector } from 'reselect'
import {
  getSearch as getRouterSearch,
  getLocation,
  RouterRootState
} from 'connected-react-router'
import { Network, Rarity } from '@kmon/schemas'
import { getView } from '../ui/nft/browse/selectors'
import { View } from '../ui/types'
import { VendorName } from '../vendor/types'
import { isVendor } from '../vendor/utils'
import { contracts } from '../contract/utils'
import { RootState } from '../reducer'
import {
  getDefaultOptionsByView,
  getURLParamArray,
  getURLParam
} from './search'
import { SortBy, Section } from './types'
import { ELEM_TYPE } from '../../components/Vendor/decentraland/NFTSections/NFTSection.data'

export const getState = (state: RootState) => state.routing

export const getVendor = createSelector<RootState, string, VendorName>(
  getRouterSearch,
  search => {
    const vendor = getURLParam<VendorName>(search, 'vendor')
    if (vendor && isVendor(vendor)) {
      return vendor
    }
    return VendorName.KRYPTOMON
  }
)

export const getSection = createSelector<
  RootState,
  string,
  VendorName,
  Section
>(
  getRouterSearch,
  getVendor,
  (search, vendor) =>
    getURLParam<Section>(search, 'section') || Section[vendor].ALL
)

export const getPage = createSelector<RootState, string, number>(
  getRouterSearch,
  search => {
    const page = getURLParam(search, 'page')
    return page === null || isNaN(+page) ? 1 : +page
  }
)

export const getSortBy = createSelector<
  RootState,
  string,
  View | undefined,
  SortBy | undefined
>(
  getRouterSearch,
  getView,
  (search, view) =>
    getURLParam<SortBy>(search, 'sortBy') ||
    getDefaultOptionsByView(view).sortBy
)

export const getOnlyOnSale = createSelector<
  RootState,
  string,
  View | undefined,
  boolean | undefined
>(getRouterSearch, getView, (search, view) => {
  const onlyOnSale = getURLParam(search, 'onlyOnSale')
  let result: boolean
  switch (onlyOnSale) {
    case 'true':
      result = true
      break
    case 'false':
      result = false
      break
    default:
      const defaultOptions = getDefaultOptionsByView(view)
      result = defaultOptions.onlyOnSale!
      break
  }
  return result
})

export const getIsMap = createSelector<RootState, string, boolean | undefined>(
  getRouterSearch,
  search => {
    const isMap = getURLParam(search, 'isMap')
    return isMap === null ? undefined : isMap === 'true'
  }
)

export const getIsFullscreen = createSelector<
  RootState,
  string,
  boolean | undefined,
  boolean | undefined
>(getRouterSearch, getIsMap, (search, isMap) => {
  const isFullscreen = getURLParam(search, 'isFullscreen')
  return isFullscreen === null ? undefined : isMap && isFullscreen === 'true'
})

export const getWearableRarities = createSelector<RootState, string, Rarity[]>(
  getRouterSearch,
  search =>
    getURLParamArray<Rarity>(
      search,
      'rarities',
      Object.values(Rarity).filter(
        value => typeof value === 'string'
      ) as string[]
    )
)

export const getContracts = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search =>
    getURLParamArray<string>(
      search,
      'contracts',
      contracts.map(contract => contract.address)
    )
)

export const getSearch = createSelector<RootState, string, string>(
  getRouterSearch,
  search => getURLParam(search, 'search') || ''
)

export const getNetwork = createSelector<
  RootState,
  string,
  Network | undefined
>(
  getRouterSearch,
  search => (getURLParam(search, 'network') as Network) || undefined
)

export const getKryptomonStatus = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'kryptomonStatus')
)

export const getElemTypes = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'elemTypes', ELEM_TYPE)
)

export const getSpecialties = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'specialties')
)

export const getSuper = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'supers')
)

export const getGeneration = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'generation')
)

export const getPrice = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'price')
)

export const getPriceToken = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'priceToken')
)

export const getAffection = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'affection')
)

export const getBraveness = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'braveness')
)

export const getConstitution = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'constitution')
)

export const getCraziness = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'craziness')
)

export const getHunger = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'hunger')
)

export const getInstinct = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'instinct')
)

export const getSmart = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'smart')
)

export const getElementStartingTalent = createSelector<
  RootState,
  string,
  string[]
>(getRouterSearch, search =>
  getURLParamArray<string>(search, 'elementStartingTalent')
)

export const getLaziness = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'laziness')
)

export const getBodySize = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'bodySize')
)

export const getEgo = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'ego')
)

export const getHealthPoints = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'healthPoints')
)

export const getSpeed = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'speed')
)

export const getSex = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'sex')
)

export const getSkinType = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'skinType')
)

export const getWater = createSelector<RootState, string, string[]>(
  getRouterSearch,
  search => getURLParamArray<string>(search, 'water')
)

export const getArrayByType = (type: string) => {
  return createSelector<RootState, string, string[]>(getRouterSearch, search =>
    getURLParamArray<string>(search, type)
  )
}

export const getPathname = createSelector<
  RootState,
  ReturnType<typeof getLocation>,
  string
>(getLocation, location => {
  return location.pathname
})

export const getReturnPath = createSelector<RootState, string, string | null>(
  getRouterSearch,
  search => {
    return getURLParam(search, 'returnPath')
  }
)
