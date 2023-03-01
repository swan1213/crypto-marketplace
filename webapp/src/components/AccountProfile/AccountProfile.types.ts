import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'

export type Props = {
  wallet: Wallet | null
}

export type MapStateProps = Pick<Props, 'wallet'>
export type MapDispatchProps = Pick<Props, 'wallet'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
