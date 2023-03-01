import React from 'react'

import { useProximity } from '../../../modules/proximity/hooks'
import { getDistanceText } from '../../../modules/proximity/utils'
import { Props } from './ProximityTags.types'
import './ProximityTags.css'

const ProximityTags = (props: Props) => {
  const { nft, proximities } = props
  const proximity = useProximity(nft, proximities)
  return (
    <>

    </>
  )
}

export default ProximityTags
