import React from 'react'
import { Props, ItemProps } from './Details.types'
import './Details.css'
import { Actions } from '../Actions'

const Details = (props: Props) => {
  const { name, price, priceWithCandies, isTxPending, onBuyItem, onBuyItemWithCandies } = props

  return (
    <div className="LootboxDetails details-container grid-container">
      <DetailItem title="Lootbox type">
        <p className="detail-big-text">{name}</p>
      </DetailItem>
      <DetailItem title="Price with KMON">
        <p className="detail-big-text">
          {price} KMON
        </p>
      </DetailItem>
      <Actions isTxPending={isTxPending} onBuy={onBuyItem} />
      <div />
      <DetailItem title="Price with Candy">
        <p className="detail-big-text">
          {priceWithCandies} CANDY
        </p>
      </DetailItem>
      <Actions isTxPending={isTxPending} onBuy={onBuyItemWithCandies} />
    </div>
  )
}

export default React.memo(Details)

const DetailItem = ({ title, children }: ItemProps) => {
  return (
    <div className="block-title">
      <p className="block-title-text">{title}</p>
      {children}
    </div>
  )
}
