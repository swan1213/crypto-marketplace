import { VendorName } from '../../../modules/vendor/types'
import { Section } from '../../../modules/vendor/routing/types'
import { MultipleFilters } from '../NFTSidebar/NFTSidebar'

export type Props = {
  vendor: VendorName
  address?: string
  section?: Section
  onSectionClick: (section: Section) => void
  onMultiItemClick: (data: MultipleFilters) => void
}
