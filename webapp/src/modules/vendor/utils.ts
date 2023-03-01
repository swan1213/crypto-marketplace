import { getSearchCategory, getSearchWearableCategory } from '../routing/search'
import { SearchOptions } from '../routing/types'
import { Section } from './routing/types'
import { NFTsFetchFilters } from './nft/types'
import { VendorName, Disabled } from './types'

export function getFilters(
  vendor: VendorName,
  searchOptions: SearchOptions
): NFTsFetchFilters {
  const { section } = searchOptions

  switch (vendor) {
    case VendorName.KRYPTOMON:
    case VendorName.DECENTRALAND: {
      const currentSection = Section[VendorName.DECENTRALAND]

      const isWearableHead = section === currentSection.WEARABLES_HEAD
      const isWearableAccessory =
        section === currentSection.WEARABLES_ACCESORIES

      const category = getSearchCategory(section!)
      const wearableCategory =
        !isWearableAccessory && category === 'wearable'
          ? getSearchWearableCategory(section!)
          : undefined

      const { wearableRarities, contracts, network } = searchOptions

      return {
        isWearableHead,
        isWearableAccessory,
        wearableCategory,
        wearableRarities,
        contracts,
        network
      } as NFTsFetchFilters<VendorName.DECENTRALAND>
    }
    case VendorName.KNOWN_ORIGIN: {
      const currentSection = Section[VendorName.KNOWN_ORIGIN]

      return {
        isEdition: section === currentSection.EDITIONS,
        isToken: section === currentSection.TOKENS
      } as NFTsFetchFilters<VendorName.KNOWN_ORIGIN>
    }
    case VendorName.SUPER_RARE:
    case VendorName.MAKERS_PLACE:
    default:
      return {}
  }
}

export function getOriginURL(vendor: VendorName) {
  switch (vendor) {
    case VendorName.DECENTRALAND:
      return 'https://market.decentraland.org'
    case VendorName.SUPER_RARE:
      return 'https://www.superrare.co'
    case VendorName.MAKERS_PLACE:
      return 'https://makersplace.com'
    case VendorName.KNOWN_ORIGIN:
      return 'https://knownorigin.io'
    default:
      throw new Error(`Base URL for ${vendor} not implemented`)
  }
}

export function isVendor(vendor: string) {
  return Object.values(VendorName).includes(vendor as VendorName)
}

export function isPartner(vendor: string) {
  return isVendor(vendor) && vendor !== VendorName.KRYPTOMON
}

export function getPartners(): VendorName[] {
  const disabledVendors = Object.values(Disabled)

  return Object.values(VendorName).filter(
    vendor => isPartner(vendor) && !disabledVendors.includes(vendor)
  )
}
