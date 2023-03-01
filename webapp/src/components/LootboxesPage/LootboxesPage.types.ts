import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'

import {
  fetchItemsRequest,
  FetchItemsRequestAction
} from '../../modules/item/actions'
import { Item } from '../../modules/item/types'

export type Params = {}

export type Props = {
  wallet: Wallet | null
  isConnecting: boolean
  isFullscreen?: boolean
  items: Record<number, Item>
  onRedirect: (path: string) => void
  onFetchItems: typeof fetchItemsRequest
}

export type MapStateProps = Pick<
  Props,
  'wallet' | 'isConnecting' | 'isFullscreen' | 'items'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchItems'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchItemsRequestAction
>
