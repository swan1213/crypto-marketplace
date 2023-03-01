import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import './IndexingDelayCard.css'

const IndexingDelay = () => {
  return (
    <Card
      className="IndexingDelayCard"
      link
      as={Link}
      to={'#'}
    >
      <div className="card-image-container">
        <div className="card-image-text justify-center">
          {t('indexing_delay.card_content')}
        </div>
      </div>
    </Card>
  )
}

export default React.memo(IndexingDelay)
