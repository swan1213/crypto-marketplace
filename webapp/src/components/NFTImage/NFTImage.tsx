import React, { useEffect, useMemo, useState } from 'react'
import { NFTCategory, Rarity } from '@kmon/schemas'
import { Loader } from '@kmon/ui'
import { LazyImage } from 'react-lazy-images'
import { NFT } from '../../modules/nft/types'
import { VendorName } from '../../modules/vendor/types'
import { getNFTName } from '../../modules/nft/utils'
import { Props } from './NFTImage.types'
import './NFTImage.css'

// 1x1 transparent pixel
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII='

const NFTImage = (props: Props) => {
  const {
    nft,
    isDraggable,
    withNavigation,
    hasPopup,
    zoom,
    isSmall
  } = props
  const { kryptomon } = (nft as NFT<
    VendorName.KRYPTOMON
  >).data

  let src;

  if (isSmall) {
    // very dirty but have not time to do it properly
    if (nft.metadata.image.indexOf(".gif") > -1)
      src = nft.metadata.image.split("gif").join("png");
    else
      src = nft.metadata.image;
  } else {
    src = nft.metadata.image;
  }

  switch (nft.category) {
    default: {
      return (
        <LazyImage
          src={src}
          alt={getNFTName(nft)}
          debounceDurationMs={1000}
          placeholder={({ ref }) => (
            <div ref={ref}>
              <Loader size="small" active />
            </div>
          )}
          actual={({ imageProps }) => (
            <img className="image" alt={getNFTName(nft)} {...imageProps} />
          )}
        />
      )
    }
  }
}

// the purpose of this wrapper is to make the div always be square, by using a 1x1 transparent pixel
const NFTImageWrapper = (props: Props) => {
  const { nft, className, ...rest } = props

  let classes = 'NFTImage'
  if (className) {
    classes += ' ' + className
  }

  return (
    <div className={classes}>
      <img src={PIXEL} alt="pixel" className="pixel" />
      <div className="image-wrapper">
        <NFTImage nft={nft} {...rest} />
      </div>
    </div>
  )
}

NFTImage.defaultProps = {
  isDraggable: false,
  withNavigation: false,
  zoom: 0.5,
  isSmall: false,
  showMonospace: false
}

export default React.memo(NFTImageWrapper)
