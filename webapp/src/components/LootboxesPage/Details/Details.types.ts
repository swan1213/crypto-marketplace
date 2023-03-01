import React from 'react'
import { ItemVersion } from '../../../modules/item/types'

export type Props = {
  name: string
  price: string
  priceWithCandies: string
  isTxPending: boolean
  onBuyItem: (version: ItemVersion) => void
  onBuyItemWithCandies: () => void
}

export type ItemProps = {
  title: string
  children: React.ReactNode
}
