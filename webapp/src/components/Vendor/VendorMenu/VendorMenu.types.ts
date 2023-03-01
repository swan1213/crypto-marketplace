import { Section } from '../../../modules/routing/types'
import { VendorName } from '../../../modules/vendor/types'
import { MultipleFilters } from '../NFTSidebar/NFTSidebar'

export type Props = {
  count?: number
  currentVendor: VendorName
  address?: string
  vendor: VendorName
  section: Section
  onClick: (value: Section) => void
  onMultiItemClick: (data: MultipleFilters) => void
}

export type MapStateProps = Pick<Props, 'count' | 'currentVendor'>
export type MapDispatchProps = {}
export type MapDispatch = {}
