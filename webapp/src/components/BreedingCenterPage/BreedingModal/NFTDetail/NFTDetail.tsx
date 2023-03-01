import React from 'react'
import { Grid } from '@kmon/ui'
import { fromWei } from 'web3x-es/utils'

import { Props } from './NFTDetail.types'
import './NFTDetail.css'
import { NFTImage } from '../../../NFTImage'
import Ice from '../../../../images/egg/elem-ice.svg'
import Air from '../../../../images/egg/elem-air.svg'
import Electro from '../../../../images/egg/elem-electro.svg'
import Ghost from '../../../../images/egg/elem-ghost.svg'
import Grass from '../../../../images/egg/elem-grass.svg'
import Ground from '../../../../images/egg/elem-ground.svg'
import Water from '../../../../images/egg/elem-water.svg'
import Fire from '../../../../images/egg/elem-fire.svg'

const NFTDetail = (props: Props) => {
  const { nft, breedingOrder, view } = props

  const genes = nft.data.kryptomon?.genes
  const classes = ['kryptomon', 'breeding-modal-nft-detail']
  if (view === "right") {
    classes.push("right")
  }

  const elementTypes = [
    {
      title: 'Water',
      value: genes?.water,
      icon: Water
    },
    {
      title: 'Grass',
      value: genes?.grass,
      icon: Grass
    },
    {
      title: 'Fire',
      value: genes?.fire,
      icon: Fire
    },
    {
      title: 'Electro',
      value: genes?.electro,
      icon: Electro
    },
    {
      title: 'Ground',
      value: genes?.ground,
      icon: Ground
    },
    {
      title: 'Ghost',
      value: genes?.ghost,
      icon: Ghost
    },
    {
      title: 'Ice',
      value: genes?.ice,
      icon: Ice
    },
    {
      title: 'Air',
      value: genes?.air,
      icon: Air
    }
  ]

  const elementType = elementTypes.find(
    element => element.title === nft.data.kryptomon?.elementType
  )

  return (
    <div className={classes.join(" ")}>
      <div className="image">
        <NFTImage nft={nft} showMonospace isSmall />
      </div>
      <div className="detail">
        <div className="detail-title">
          {nft.metadata.name}
          <img
            className="product-type-icon"
            src={elementType?.icon}
            alt="icon"
          />
        </div>
        <Grid columns={2} stackable className="detail-content">
          <Grid.Row>
            <Grid.Column>GENERATION:</Grid.Column>
            <Grid.Column>{nft.data.kryptomon?.genes.generation}</Grid.Column>
          </Grid.Row>
          {breedingOrder && (
            <Grid.Row>
              <Grid.Column>BREED PRICE:</Grid.Column>
              <Grid.Column>{fromWei(breedingOrder.price, "ether")} KMON</Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column>BREED AMOUNT:</Grid.Column>
            <Grid.Column>{nft.data.kryptomon?.totalBreedingCount ? nft.data.kryptomon?.totalBreedingCount : 0}/{nft.data.kryptomon?.maxBreedingsDuringLifePhase}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}

export default React.memo(NFTDetail)
