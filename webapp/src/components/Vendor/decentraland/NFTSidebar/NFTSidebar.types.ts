import { Section } from '../../../../modules/vendor/decentraland/routing/types'
import { MultipleFilters } from '../../NFTSidebar/NFTSidebar'

export type Props = {
  section: Section
  onMenuItemClick: (section: Section) => void
  onMultiItemClick: (data: MultipleFilters) => void
} & MultipleFilters
