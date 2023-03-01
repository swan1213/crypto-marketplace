import { createMatchSelector } from 'connected-react-router'
import { createSelector } from 'reselect'

import { locations } from '../routing/locations'
import { RootState } from '../reducer'
import { Item } from './types'
import { ItemState } from './reducer'

export const getState = (state: RootState) => state.item
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error

const itemDetailMatchSelector = createMatchSelector<
  RootState,
  {
    id: string
  }
>(locations.item(':id'))

export const getItemId = createSelector<
  RootState,
  ReturnType<typeof itemDetailMatchSelector>,
  string | null
>(itemDetailMatchSelector, match => match?.params.id || null)

export const getCurrentItem = createSelector<
  RootState,
  string | null,
  ItemState['data'],
  Item | undefined
>(
  state => getItemId(state),
  state => getData(state),
  (itemId, items) => {
    if (itemId === null) {
      return undefined
    }
    return items.find(item => item.itemId === itemId)
  }
)
