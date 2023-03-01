import { action } from 'typesafe-actions'

import { View } from './types'

// Set View
export const SET_VIEW = 'Set View'
export const setView = (view: View) => action(SET_VIEW, { view })
export type SetViewAction = ReturnType<typeof setView>

export const SHOW_BREED_PRICE_MODAL = 'Show Breed Price Modal'
export const showBreedPriceModal = (show: boolean) => action(SHOW_BREED_PRICE_MODAL, { show })
export type ShowBreedPriceModalAction = ReturnType<typeof showBreedPriceModal>
