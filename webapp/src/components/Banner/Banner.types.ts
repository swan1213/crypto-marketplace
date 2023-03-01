import { Dispatch } from 'redux'

export type Props = {
  isSignedIn: boolean,
  subgraphBlockNumber?: number
}

export type MapStateProps = Pick<
  Props,
  'isSignedIn' | 'subgraphBlockNumber'
>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
