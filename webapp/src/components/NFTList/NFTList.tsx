import React, { useCallback, useState, useEffect } from 'react'
import { Card, Button, Loader } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { getAnalytics } from '@kmon/dapps/dist/modules/analytics/utils'

import { getMaxQuerySize, MAX_PAGE, PAGE_SIZE } from '../../modules/vendor/api'
import { NFTCard } from '../NFTCard'
import { Props } from './NFTList.types'
import { IndexingDelay } from '../IndexingDelayCard'
import { useIndexingDelay } from '../../hooks'

const NFTList = (props: Props) => {
  const { vendor, nfts, page, count, subgraphBlockNumber, isLoading, isSignedIn, isPreventClick, myNFT, pathname, onBrowse, onClickCard } = props
  const { showIndexingDelay } = useIndexingDelay(subgraphBlockNumber, isSignedIn)

  const handleLoadMore = useCallback(() => {
    const newPage = page + 1
    if (/^\/breed/gi.test(pathname)) {
      if (myNFT) {
        const newSex = [];
        if (parseInt(myNFT?.data.kryptomon!.genes.sex.toString()) > 5) { // female
          newSex.push("0")
          newSex.push("5")
        }
        else { //male
          newSex.push("6")
          newSex.push("10")
        }
        onBrowse({ page: newPage, isInBreedingCentre: true, sex: newSex, owner: myNFT.owner })
      } else {
        onBrowse({ page: newPage, isInBreedingCentre: true })
      }
    }
    else {
      onBrowse({ page: newPage })
    }
  }, [onBrowse, page, myNFT, pathname])

  const maxQuerySize = getMaxQuerySize(vendor)

  const hasExtraPages =
    (nfts.length !== count || count === maxQuerySize) && page <= MAX_PAGE

  const isLoadingNewPage = isLoading && nfts.length >= PAGE_SIZE

  return (
    <>
      <Card.Group>
        {showIndexingDelay && <IndexingDelay />}
        {nfts.length > 0
          ? nfts.map((nft, index) => (
            <NFTCard
              key={nft.id + '-' + index}
              nft={nft}
              status={{ showPrice: true }}
              isPreventClick={isPreventClick}
              onClickCard={onClickCard}
            />
          ))
          : null}

        {isLoading ? (
          <>
            <div className="overlay" />
            <Loader size="massive" active />
          </>
        ) : null}
      </Card.Group>

      {nfts.length === 0 && !isLoading ? (
        <div className="empty">{t('nft_list.empty')}</div>
      ) : null}

      {nfts.length > 0 && hasExtraPages && (!isLoading || isLoadingNewPage) ? (
        <div className="load-more">
          <Button loading={isLoading} primary onClick={handleLoadMore}>
            {t('global.load_more')}
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default React.memo(NFTList)
