import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { UserMenuProps } from '@kmon/ui'

export type Props = Partial<UserMenuProps>

export type MapStateProps = Pick<
  Props,
  'isSignedIn' | 'isSigningIn' | 'isActivity' | 'hasActivity'
>
export type MapDispatchProps = Pick<
  Props,
  'onClickAccount' | 'onClickActivity' | 'onClickSettings'
>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
