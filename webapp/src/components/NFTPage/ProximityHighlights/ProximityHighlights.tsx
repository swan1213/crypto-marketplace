import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { getDistanceText } from '../../../modules/proximity/utils'
import { Highlights } from '../Highlights'
import { Props } from './ProximityHighlights.types'
import { Highlight } from '../Highlight'
import { useProximity } from '../../../modules/proximity/hooks'
import { VendorName } from '../../../modules/vendor'
import { NFT } from '../../../modules/nft/types'
import './ProximityHighlights.css'

const ProximityHighlights = (props: Props) => {
  const { nft, proximities } = props
  const proximity = useProximity(
    nft as NFT<VendorName.KRYPTOMON>,
    proximities
  )

  return (
    <div className="ProximityHighlights">
      null
    </div>
  )
}

export default React.memo(ProximityHighlights)
