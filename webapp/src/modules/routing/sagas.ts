import { takeEvery, put, select, call } from 'redux-saga/effects'
import { push, getLocation } from 'connected-react-router'
import { VendorName } from '../vendor/types'
import { View } from '../ui/types'
import { getView } from '../ui/nft/browse/selectors'
import {
  getIsFullscreen,
  getNetwork,
  getVendor,
  getElemTypes,
  getSuper,
  getSpecialties,
  getAffection,
  getBraveness,
  getLaziness,
  getConstitution,
  getCraziness,
  getElementStartingTalent,
  getHunger,
  getInstinct,
  getSmart,
  getBodySize,
  getEgo,
  getHealthPoints,
  getSpeed,
  getSex,
  getSkinType,
  getArrayByType,
  getGeneration,
  getPrice,
  getPriceToken
} from '../routing/selectors'
import { getAddress as getWalletAddress } from '../wallet/selectors'
import { getAddress as getAccountAddress } from '../account/selectors'
import { fetchNFTsRequest } from '../nft/actions'
import { setView } from '../ui/actions'
import { getFilters } from '../vendor/utils'
import { getOrder } from '../nft/utils'
import { MAX_PAGE, PAGE_SIZE, getMaxQuerySize } from '../vendor/api'
import { locations } from './locations'
import {
  getSearchParams,
  getSearchCategory,
  getDefaultOptionsByView,
  SEARCH_ARRAY_PARAM_SEPARATOR
} from './search'
import {
  getPage,
  getSection,
  getSortBy,
  getOnlyOnSale,
  getIsMap,
  getWearableRarities,
  getContracts,
  getSearch,
  getKryptomonStatus
} from './selectors'
import {
  BROWSE_NFTS,
  BrowseNFTsAction,
  FETCH_NFTS_FROM_ROUTE,
  FetchNFTsFromRouteAction,
  setIsLoadMore
} from './actions'
import { SearchOptions } from './types'

export function* routingSaga() {
  yield takeEvery(FETCH_NFTS_FROM_ROUTE, handleFetchNFTsFromRoute)
  yield takeEvery(BROWSE_NFTS, handleBrowse)
}

function* handleFetchNFTsFromRoute(action: FetchNFTsFromRouteAction) {
  const newSearchOptions: SearchOptions = yield getNewSearchOptions(
    action.payload.searchOptions
  )
  yield fetchNFTsFromRoute(newSearchOptions)
}

function* handleBrowse(action: BrowseNFTsAction) {
  const newSearchOptions: SearchOptions = yield getNewSearchOptions(
    action.payload.searchOptions
  )

  yield fetchNFTsFromRoute(newSearchOptions)

  const { pathname }: ReturnType<typeof getLocation> = yield select(getLocation)
  const params = getSearchParams(newSearchOptions)

  yield put(push(params ? `${pathname}?${params.toString()}` : pathname))
}

// ------------------------------------------------
// Utility functions, not handlers

function* fetchNFTsFromRoute(searchOptions: SearchOptions) {
  const view = searchOptions.view!
  const vendor = searchOptions.vendor!
  const page = searchOptions.page!
  const section = searchOptions.section!
  const sortBy = searchOptions.sortBy!
  const {
    search,
    onlyOnSale,
    isMap,
    address,
    kryptomonStatus,
    elemTypes,
    specialties,
    supers,
    generation,
    affection,
    braveness,
    constitution,
    craziness,
    hunger,
    instinct,
    smart,
    elementStartingTalent,
    laziness,
    sex,
    skinType,
    bodySize,
    ego,
    healthPoints,
    speed,
    orderStatus,
    water,
    waterTalent,
    fire,
    fireTalent,
    ground,
    groundTalent,
    ice,
    iceTalent,
    grass,
    grassTalent,
    electro,
    electroTalent,
    ghost,
    ghostTalent,
    air,
    airTalent,
    color,
    attack,
    defence,
    generalTalent,
    growthTalentFactor,
    elementPercentage,
    special,
    price,
    priceToken,
    unfreezable,
    isInBreedingCentre,
    owner
  } = searchOptions

  const isLoadMore = view === View.LOAD_MORE

  const offset = isLoadMore ? page - 1 : 0
  const skip = Math.min(offset, MAX_PAGE) * PAGE_SIZE
  const first = Math.min(page * PAGE_SIZE - skip, getMaxQuerySize(vendor))

  const [orderBy, orderDirection] = getOrder(sortBy)
  const category = getSearchCategory(section)

  yield put(setIsLoadMore(isLoadMore))
  const arrayToString = (arr: string[] | undefined) => {
    if (!arr) {
      return ''
    }
    return arr.join(SEARCH_ARRAY_PARAM_SEPARATOR)
  }
  if (isMap) {
    yield put(setView(view))
  } else {
    yield put(
      fetchNFTsRequest({
        vendor,
        view,
        params: {
          first,
          skip,
          orderBy,
          orderDirection,
          onlyOnSale,
          address,
          category,
          search,
          section,
          kryptomonStatus: arrayToString(kryptomonStatus),
          elemTypes: arrayToString(elemTypes),
          specialties: arrayToString(specialties),
          supers: arrayToString(supers),
          generation: arrayToString(generation),
          affection: arrayToString(affection),
          braveness: arrayToString(braveness),
          constitution: arrayToString(constitution),
          craziness: arrayToString(craziness),
          hunger: arrayToString(hunger),
          instinct: arrayToString(instinct),
          smart: arrayToString(smart),
          elementStartingTalent: arrayToString(elementStartingTalent),
          laziness: arrayToString(laziness),
          sex: arrayToString(sex),
          skinType: arrayToString(skinType),
          bodySize: arrayToString(bodySize),
          ego: arrayToString(ego),
          healthPoints: arrayToString(healthPoints),
          speed: arrayToString(speed),
          orderStatus,
          water: arrayToString(water),
          waterTalent: arrayToString(waterTalent),
          fire: arrayToString(fire),
          fireTalent: arrayToString(fireTalent),
          ground: arrayToString(ground),
          groundTalent: arrayToString(groundTalent),
          ice: arrayToString(ice),
          iceTalent: arrayToString(iceTalent),
          grass: arrayToString(grass),
          grassTalent: arrayToString(grassTalent),
          electro: arrayToString(electro),
          electroTalent: arrayToString(electroTalent),
          ghost: arrayToString(ghost),
          ghostTalent: arrayToString(ghostTalent),
          air: arrayToString(air),
          airTalent: arrayToString(airTalent),
          color: arrayToString(color),
          attack: arrayToString(attack),
          defence: arrayToString(defence),
          generalTalent: arrayToString(generalTalent),
          growthTalentFactor: arrayToString(growthTalentFactor),
          elementPercentage: arrayToString(elementPercentage),
          special: arrayToString(special),
          price: arrayToString(price),
          priceToken: arrayToString(priceToken),
          unfreezable: arrayToString(unfreezable),
          isInBreedingCentre,
          owner
        },
        filters: getFilters(vendor, searchOptions)
      })
    )
  }
}

function* getNewSearchOptions(current: SearchOptions) {
  let previous: SearchOptions = {
    address: yield getAddress(),
    vendor: yield select(getVendor),
    section: yield select(getSection),
    page: yield select(getPage),
    view: yield select(getView),
    sortBy: yield select(getSortBy),
    search: yield select(getSearch),
    onlyOnSale: yield select(getOnlyOnSale),
    isMap: yield select(getIsMap),
    isFullscreen: yield select(getIsFullscreen),
    wearableRarities: yield select(getWearableRarities),
    contracts: yield select(getContracts),
    network: yield select(getNetwork),
    kryptomonStatus: yield select(getKryptomonStatus),
    elemTypes: yield select(getElemTypes),
    specialties: yield select(getSpecialties),
    supers: yield select(getSuper),
    generation: yield select(getGeneration),
    affection: yield select(getAffection),
    braveness: yield select(getBraveness),
    constitution: yield select(getConstitution),
    craziness: yield select(getCraziness),
    hunger: yield select(getHunger),
    instinct: yield select(getInstinct),
    smart: yield select(getSmart),
    elementStartingTalent: yield select(getElementStartingTalent),
    laziness: yield select(getLaziness),
    sex: yield select(getSex),
    skinType: yield select(getSkinType),
    bodySize: yield select(getBodySize),
    ego: yield select(getEgo),
    healthPoints: yield select(getHealthPoints),
    speed: yield select(getSpeed),
    water: yield select(getArrayByType('water')),
    waterTalent: yield select(getArrayByType('waterTalent')),
    fire: yield select(getArrayByType('fire')),
    fireTalent: yield select(getArrayByType('fireTalent')),
    ground: yield select(getArrayByType('ground')),
    groundTalent: yield select(getArrayByType('groundTalent')),
    ice: yield select(getArrayByType('ice')),
    iceTalent: yield select(getArrayByType('iceTalent')),
    grass: yield select(getArrayByType('grass')),
    grassTalent: yield select(getArrayByType('grassTalent')),
    electro: yield select(getArrayByType('electro')),
    electroTalent: yield select(getArrayByType('electroTalent')),
    ghost: yield select(getArrayByType('ghost')),
    ghostTalent: yield select(getArrayByType('ghostTalent')),
    air: yield select(getArrayByType('air')),
    airTalent: yield select(getArrayByType('airTalent')),
    color: yield select(getArrayByType('color')),
    attack: yield select(getArrayByType('attack')),
    defence: yield select(getArrayByType('defence')),
    generalTalent: yield select(getArrayByType('generalTalent')),
    growthTalentFactor: yield select(getArrayByType('growthTalentFactor')),
    elementPercentage: yield select(getArrayByType('elementPercentage')),
    special: yield select(getArrayByType('special')),
    price: yield select(getPrice),
    priceToken: yield select(getPriceToken),
    unfreezable: yield select(getArrayByType('unfreezable'))
  }
  current = yield deriveCurrentOptions(previous, current)

  const view = deriveView(previous, current)
  const vendor = deriveVendor(previous, current)

  if (shouldResetOptions(previous, current)) {
    previous = {
      page: 1,
      onlyOnSale: previous.onlyOnSale,
      sortBy: previous.sortBy
    }
  }

  const defaults = getDefaultOptionsByView(view)

  const result: SearchOptions = {
    ...defaults,
    ...previous,
    ...current,
    view,
    vendor
  }

  return result
}

function* getAddress() {
  const { pathname }: ReturnType<typeof getLocation> = yield select(getLocation)
  let address: string | undefined

  if (pathname === locations.currentAccount()) {
    address = yield select(getWalletAddress)
  } else {
    address = yield select(getAccountAddress)
  }

  return address ? address.toLowerCase() : undefined
}

// TODO: Consider moving this should live to each vendor
function* deriveCurrentOptions(
  previous: SearchOptions,
  current: SearchOptions
) {
  let newOptions = { ...current }

  const nextCategory = getSearchCategory(current.section!)

  switch (nextCategory) {
    case 'wearable': {
      const prevCategory = getSearchCategory(previous.section!)

      // Category specific logic to keep filters if the category doesn't change
      if (prevCategory && prevCategory === nextCategory) {
        newOptions = {
          wearableRarities: yield select(getWearableRarities),
          contracts: yield select(getContracts),
          search: yield select(getSearch),
          network: yield select(getNetwork),
          ...newOptions
        }
      }
    }
  }

  return newOptions
}

function deriveView(previous: SearchOptions, current: SearchOptions) {
  return previous.page! < current.page!
    ? View.LOAD_MORE
    : current.view || previous.view
}

function deriveVendor(previous: SearchOptions, current: SearchOptions) {
  return current.vendor || previous.vendor || VendorName.KRYPTOMON
}

function shouldResetOptions(previous: SearchOptions, current: SearchOptions) {
  return (
    (current.vendor && current.vendor !== previous.vendor) ||
    (current.section && current.section !== previous.section)
  )
}
