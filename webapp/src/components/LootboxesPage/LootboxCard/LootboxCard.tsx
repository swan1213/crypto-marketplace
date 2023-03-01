import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { locations } from '../../../modules/routing/locations'
import { Props } from './LootboxCard.types'
import { Image } from '../../Image'
import './LootboxCard.css'

const LootboxCard = (props: Props) => {
  const { itemId, name, price, priceWithCandies, image } = props
  let itemName = name.replace(/_/g, ' ')
  itemName = itemName.replace(/basic/gi, 'bronze')
  itemName = itemName.replace(/medium/gi, 'silver')
  itemName = itemName.replace(/premium/gi, 'gold')
  const itemPrice = Number.parseFloat(price).toFixed(2)
  const itemPriceWithCandies = Number.parseFloat(priceWithCandies).toFixed(2)

  return (
    <Card
      className="LootboxCard"
      link
      as={Link}
      to={locations.item(itemId)}
    >
      <div className="card-image-container">
        <div className="card-image">
          <Image src={image} />
        </div>
        <div className="card-image-text">
          <div className="product-type-price-container">
            <div className="product-type-price">{itemPrice} KMON</div>
          </div>
          <div className="product-info">
            <p className="product-info-value">
              VALUE {itemPrice}{' '}
              KMON
            </p>
          </div>
        </div>
        <div className="card-image-text candy">
          <div className="product-type-price-container">
            <div className="product-type-price">{itemPriceWithCandies} CANDY</div>
          </div>
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-left">
          <p className="product-description-left-item">
            Item type: {itemName}
          </p>
        </div>
        <div className="product-description-right">{itemPrice} KMON</div>
      </div>
    </Card>
  )
}

export default React.memo(LootboxCard)
