import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import { Props } from './Banner.types'
import './Banner.css'
import { useIndexingDelay } from '../../hooks'

const Banner = (props: Props) => {
  const { subgraphBlockNumber, isSignedIn } = props
  const { showIndexingDelay, indexingDelay } = useIndexingDelay(subgraphBlockNumber, isSignedIn)

  return (
    <div className="Banner">
      {showIndexingDelay && (
        <div className="ui container">
          <span className="indexing-delay">{t('banner.title')}: {indexingDelay}</span> {t('banner.content')}
        </div>
      )}
    </div>
  )
}

export default React.memo(Banner)
