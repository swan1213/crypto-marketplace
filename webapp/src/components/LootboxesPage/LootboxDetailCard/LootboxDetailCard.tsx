import React from 'react'
import { Row } from '@kmon/ui'

import { Props } from './LootboxDetailCard.types'
import { Image } from '../../Image'
import './LootboxDetailCard.css'

const LootboxDetailCard = (props: Props) => {
  const { name, image, price, priceWithCandies } = props
  return (
    <div className="lootbox-detail-card card">
      <div className="card-image-container">
        <div className="card-image">
          <Image src={image} />
        </div>
        <div className="card-image-text">
          <div className="product-type-price-container">
            <div className="product-type-price">{price} KMON</div>
          </div>
        </div>
        <div className="card-image-text candy">
          <div className="product-type-price-container">
            <div className="product-type-price">{priceWithCandies} CANDY</div>
          </div>
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-left">
          <Row>
            <p className="product-info-number">{name.replace(/_/g, ' ')}</p>
          </Row>
          <p className="product-description-left-item">{price} KMON</p>
        </div>
        <div className="product-description-right">ERC-721</div>
      </div>
    </div>
  )
}

export default React.memo(LootboxDetailCard)
