import React from 'react'

import { VendorName } from '../../../modules/vendor/types'
import { PictureFrameDetail } from '../../NFTPage/PictureFrameDetail'
import { KryptomonDetail } from '../../NFTPage/KryptomonDetail'
import { Props } from './NFTDetail.types'

const NFTDetail = (props: Props) => {
  const { nft, order } = props

  const { kryptomon } = nft.data as any

  return (
    <>
      {kryptomon ? <KryptomonDetail nft={nft} order={order} /> : null}
      {nft.vendor !== VendorName.KRYPTOMON ? (
        <PictureFrameDetail nft={nft} />
      ) : null}
    </>
  )
}

export default React.memo(NFTDetail)
