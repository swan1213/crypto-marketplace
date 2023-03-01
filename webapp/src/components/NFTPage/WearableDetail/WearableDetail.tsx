import React, { useCallback } from 'react'
import { Props } from './WearableDetail.types'
import './WearableDetail.css'

const WearableDetail = (props: Props) => {
  const { nft, onNavigate } = props

  return (
    <div className="WearableDetail">
    </div>
  )
}

export default React.memo(WearableDetail)
