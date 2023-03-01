import React from 'react'
import { Button } from '@kmon/ui'

import { Props } from './Actions.types'
import { ItemVersion } from '../../../modules/item/types'

const Actions = (props: Props) => {
  const { isTxPending, onBuy } = props

  return (
    <>
      <Button
        disabled={isTxPending}
        loading={isTxPending}
        onClick={() => onBuy(ItemVersion.V2)} primary
      >
        Buy
      </Button>
    </>
  )
}

export default React.memo(Actions)
