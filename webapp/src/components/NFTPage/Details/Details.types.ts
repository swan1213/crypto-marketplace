import React from 'react'
import { Order } from '../../../modules/order/types'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  nft: NFT
  order: Order | null
}

export type ItemProps = {
  title: string
  children: React.ReactNode
}

export type MapStateProps = Pick<Props, 'order'>
export type MapDispatchProps = {}
export type OwnProps = Pick<Props, 'nft' | 'order'>
