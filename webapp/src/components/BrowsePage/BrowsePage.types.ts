import { VendorName } from '../../modules/vendor/types'

export type Props = {
  vendor: VendorName
  isFullscreen?: boolean
  pathname: string
}

export type MapStateProps = Pick<Props, 'vendor' | 'isFullscreen' | 'pathname'>
export type MapDispatchProps = {}
export type MapDispatch = {}
