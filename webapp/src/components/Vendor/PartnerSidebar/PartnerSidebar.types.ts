import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'

import { VendorName } from '../../../modules/vendor/types'
import { Section } from '../../../modules/routing/types'
import { MultipleFilters } from '../NFTSidebar/NFTSidebar'

export type Props = {
  vendor: VendorName
  section: Section
  onNavigate: (path: string) => void
  onMenuItemClick: (section: Section) => void
  onMultiItemClick: (data: MultipleFilters) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
