import React from 'react'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTDetailCard.types'
import './NFTDetailCard.css'
import { Row } from '../Layout/Row'
import { Radio } from '@kmon/ui'

const NFTDetailCard = (props: Props) => {
  const { nft, elementType, isV2, toogleV2 } = props
  const laidTimestamp = nft.data.kryptomon!.timeBorn * 1000
  var options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const lastEvolvedTime = nft.data.kryptomon?.lastEvolved != null ? nft.data.kryptomon?.lastEvolved : nft.data.kryptomon?.timeHatched;
  const laid = new Date(laidTimestamp).toLocaleDateString(undefined, options)
  const isV2New = nft.contractAddress.toUpperCase() == '0x04b0f7d5cb2ce4688497f2525748fb7a9affa394'.toUpperCase() || nft.contractAddress.toUpperCase() == '0x5eA74A7105f9c2628AbE80D3Af22Afb1d7CE9A46'.toUpperCase();
  const lastEvolved = nft.data.kryptomon?.status == "0" ? laid : new Date(lastEvolvedTime! * 1000).toLocaleDateString(undefined, options);
  const lastEvolvedTitle = nft.data.kryptomon?.status == "0" ? 'Laid' : nft.data.kryptomon?.status == "1" ? 'Hatched' : parseInt(nft.data.kryptomon!.status) > 1 ? 'Last Evolved' : undefined
  return (
    <div className="card">
      <div className="card-image-container">
        <div className="card-image">
          <NFTImage nft={nft} showMonospace />
        </div>
        <div className="card-image-text-details">
          {
            !isV2New && (
              <Radio
                toggle
                checked={isV2}
                onChange={toogleV2}
                label={isV2 ? 'V2' : 'V1'}
              />
            )
          }
          <img
            className="product-type-icon-details"
            src={elementType.icon}
            alt="icon"
          />
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-left">
          <Row>
            <p className="product-info-number">{nft.metadata?.name}</p>
            <div className="product-verified" />
          </Row>
          <p className="product-description-left-item">
            Number: {nft.tokenId}
          </p>
          <p className="product-description-left-item">{lastEvolvedTitle}: {lastEvolved}</p>
        </div>
        <div className="product-description-right">
          <span className='product-type-price'>Gen: {nft.data.kryptomon?.genes.generation}</span>
          <span>ERC-721</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NFTDetailCard)
