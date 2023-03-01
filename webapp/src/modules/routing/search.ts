import { Network, NFTCategory, WearableCategory } from '@kmon/schemas'
import { View } from '../ui/types'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { SearchOptions, SortBy } from './types'

export const SEARCH_ARRAY_PARAM_SEPARATOR = '_'

export function getDefaultOptionsByView(view?: View): SearchOptions {
  return {
    onlyOnSale: false,
    sortBy: view === View.ACCOUNT ? SortBy.NEWEST : SortBy.NEWEST
  }
}

export function getSearchParams(options?: SearchOptions) {
  let params: URLSearchParams | undefined

  if (options) {
    params = new URLSearchParams()

    if (options.section) {
      params.set('section', options.section)
    }

    if (options.isMap !== undefined) {
      params.set('isMap', options.isMap.toString())
      // isFullscreen is only set if isMap is true
      if (options.isFullscreen !== undefined) {
        params.set('isFullscreen', options.isFullscreen.toString())
      }
    }

    if (options.vendor) {
      params.set('vendor', options.vendor)
    }
    if (options.page) {
      params.set('page', options.page.toString())
    }
    if (options.sortBy) {
      params.set('sortBy', options.sortBy)
    }
    if (options.onlyOnSale !== undefined) {
      params.set('onlyOnSale', options.onlyOnSale.toString())
    }
    if (options.wearableRarities && options.wearableRarities.length > 0) {
      params.set(
        'rarities',
        options.wearableRarities.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.contracts && options.contracts.length > 0) {
      params.set(
        'contracts',
        options.contracts.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.search) {
      params.set('search', options.search)
    }

    if (options.network && Object.values(Network).includes(options.network)) {
      params.set('network', options.network)
    }

    if (options.kryptomonStatus && options.kryptomonStatus.length > 0) {
      params.set(
        'kryptomonStatus',
        options.kryptomonStatus.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.elemTypes && options.elemTypes.length > 0) {
      params.set(
        'elemTypes',
        options.elemTypes.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.specialties && options.specialties.length > 0) {
      params.set(
        'specialties',
        options.specialties.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.supers && options.supers.length > 0) {
      params.set('supers', options.supers.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.generation && options.generation.length > 0) {
      params.set(
        'generation',
        options.generation.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.price && options.price.length > 0) {
      params.set('price', options.price.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.priceToken && options.priceToken.length > 0) {
      params.set(
        'priceToken',
        options.priceToken.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.affection && options.affection.length > 0) {
      params.set(
        'affection',
        options.affection.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.unfreezable && options.unfreezable.length > 0) {
      params.set(
        'unfreezable',
        options.unfreezable.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.laziness && options.laziness.length > 0) {
      params.set(
        'laziness',
        options.laziness.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.braveness && options.braveness.length > 0) {
      params.set(
        'braveness',
        options.braveness.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.constitution && options.constitution.length > 0) {
      params.set(
        'constitution',
        options.constitution.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.craziness && options.craziness.length > 0) {
      params.set(
        'craziness',
        options.craziness.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.hunger && options.hunger.length > 0) {
      params.set('hunger', options.hunger.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.instinct && options.instinct.length > 0) {
      params.set(
        'instinct',
        options.instinct.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.smart && options.smart.length > 0) {
      params.set('smart', options.smart.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (
      options.elementStartingTalent &&
      options.elementStartingTalent.length > 0
    ) {
      params.set(
        'elementStartingTalent',
        options.elementStartingTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.sex && options.sex.length > 0) {
      params.set('sex', options.sex.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.skinType && options.skinType.length > 0) {
      params.set(
        'skinType',
        options.skinType.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.bodySize && options.bodySize.length > 0) {
      params.set(
        'bodySize',
        options.bodySize.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.ego && options.ego.length > 0) {
      params.set('ego', options.ego.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.healthPoints && options.healthPoints.length > 0) {
      params.set(
        'healthPoints',
        options.healthPoints.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.speed && options.speed.length > 0) {
      params.set('speed', options.speed.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }

    if (options.water && options.water.length > 0) {
      params.set('water', options.water.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.waterTalent && options.waterTalent.length > 0) {
      params.set(
        'waterTalent',
        options.waterTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.fire && options.fire.length > 0) {
      params.set('fire', options.fire.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.fireTalent && options.fireTalent.length > 0) {
      params.set(
        'fireTalent',
        options.fireTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.ground && options.ground.length > 0) {
      params.set('ground', options.ground.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.groundTalent && options.groundTalent.length > 0) {
      params.set(
        'groundTalent',
        options.groundTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.ice && options.ice.length > 0) {
      params.set('ice', options.ice.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.iceTalent && options.iceTalent.length > 0) {
      params.set(
        'iceTalent',
        options.iceTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.grass && options.grass.length > 0) {
      params.set('grass', options.grass.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.grassTalent && options.grassTalent.length > 0) {
      params.set(
        'grassTalent',
        options.grassTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.electro && options.electro.length > 0) {
      params.set('electro', options.electro.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.electroTalent && options.electroTalent.length > 0) {
      params.set(
        'electroTalent',
        options.electroTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.ghost && options.ghost.length > 0) {
      params.set('ghost', options.ghost.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.ghostTalent && options.ghostTalent.length > 0) {
      params.set(
        'ghostTalent',
        options.ghostTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.air && options.air.length > 0) {
      params.set('air', options.air.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.airTalent && options.airTalent.length > 0) {
      params.set(
        'airTalent',
        options.airTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.color && options.color.length > 0) {
      params.set('color', options.color.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.attack && options.attack.length > 0) {
      params.set('attack', options.attack.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.defence && options.defence.length > 0) {
      params.set('defence', options.defence.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.generalTalent && options.generalTalent.length > 0) {
      params.set(
        'generalTalent',
        options.generalTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.growthTalentFactor && options.growthTalentFactor.length > 0) {
      params.set(
        'growthTalentFactor',
        options.growthTalentFactor.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.elementPercentage && options.elementPercentage.length > 0) {
      params.set(
        'elementPercentage',
        options.elementPercentage.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.special && options.special.length > 0) {
      params.set('special', options.special.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
  }
  return params
}

export function getSearchCategory(section: Section) {
  // TODO: Move this to each vendor? Names shortened for brevity here
  const DclSection = Section[VendorName.DECENTRALAND]
  switch (section) {
    case DclSection.PARCELS:
      return 'parcel'
    case DclSection.ESTATES:
      return 'estate'
    case DclSection.WEARABLES:
    case DclSection.WEARABLES_HEAD:
    case DclSection.WEARABLES_EYEBROWS:
    case DclSection.WEARABLES_EYES:
    case DclSection.WEARABLES_FACIAL_HAIR:
    case DclSection.WEARABLES_HAIR:
    case DclSection.WEARABLES_MOUTH:
    case DclSection.WEARABLES_UPPER_BODY:
    case DclSection.WEARABLES_LOWER_BODY:
    case DclSection.WEARABLES_FEET:
    case DclSection.WEARABLES_ACCESORIES:
    case DclSection.WEARABLES_EARRING:
    case DclSection.WEARABLES_EYEWEAR:
    case DclSection.WEARABLES_HAT:
    case DclSection.WEARABLES_HELMET:
    case DclSection.WEARABLES_MASK:
    case DclSection.WEARABLES_TIARA:
    case DclSection.WEARABLES_TOP_HEAD:
      return 'wearable'
    case DclSection.ENS:
      return 'ens'
    default:
      return NFTCategory.KRYPTOMON
  }
}

export function getSearchWearableSection(category: WearableCategory) {
  const DclSection = Section[VendorName.DECENTRALAND]
  for (const section of Object.values(DclSection)) {
    const sectionCategory = getSearchWearableCategory(section)
    if (category === sectionCategory) {
      return section
    }
  }
}

export function getSearchWearableCategory(section: Section) {
  const DclSection = Section[VendorName.DECENTRALAND]
  switch (section) {
    case DclSection.WEARABLES_EYEBROWS:
      return WearableCategory.EYEBROWS
    case DclSection.WEARABLES_EYES:
      return WearableCategory.EYES
    case DclSection.WEARABLES_FACIAL_HAIR:
      return WearableCategory.FACIAL_HAIR
    case DclSection.WEARABLES_HAIR:
      return WearableCategory.HAIR
    case DclSection.WEARABLES_MOUTH:
      return WearableCategory.MOUTH
    case DclSection.WEARABLES_UPPER_BODY:
      return WearableCategory.UPPER_BODY
    case DclSection.WEARABLES_LOWER_BODY:
      return WearableCategory.LOWER_BODY
    case DclSection.WEARABLES_FEET:
      return WearableCategory.FEET
    case DclSection.WEARABLES_EARRING:
      return WearableCategory.EARRING
    case DclSection.WEARABLES_EYEWEAR:
      return WearableCategory.EYEWEAR
    case DclSection.WEARABLES_HAT:
      return WearableCategory.HAT
    case DclSection.WEARABLES_HELMET:
      return WearableCategory.HELMET
    case DclSection.WEARABLES_MASK:
      return WearableCategory.MASK
    case DclSection.WEARABLES_TIARA:
      return WearableCategory.TIARA
    case DclSection.WEARABLES_TOP_HEAD:
      return WearableCategory.TOP_HEAD
  }
}

export function getURLParamArray<T extends string>(
  search: string,
  paramName: string,
  validValues: string[] = []
) {
  const param = getURLParam<T>(search, paramName)
  if (param === null) {
    return []
  } else if (validValues && validValues.length > 0) {
    return param
      .split(SEARCH_ARRAY_PARAM_SEPARATOR)
      .filter(item => validValues.includes(item as T)) as T[]
  } else {
    return param
      .split(SEARCH_ARRAY_PARAM_SEPARATOR)
      .filter(item => item as T) as T[]
  }
}

export function getURLParam<T extends string>(
  search: string,
  paramName: string
) {
  const param = new URLSearchParams(search).get(paramName) as T | null
  return param
}
