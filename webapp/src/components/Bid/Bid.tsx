import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Coin } from '@kmon/schemas'
import { Loader, Stats, Button } from '@kmon/ui'
import { Profile } from '@kmon/dapps/dist/containers'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { locations } from '../../modules/routing/locations'
import { addressEquals } from '../../modules/wallet/utils'
import { getContractNames } from '../../modules/vendor'
import { getContract } from '../../modules/contract/utils'
import { NFTProvider } from '../NFTProvider'
import { NFTImage } from '../NFTImage'
import { CoinPopup } from '../CoinPopup'
import { AcceptButton } from './AcceptButton'
import { WarningMessage } from './WarningMessage'
import { formatCoin } from '../../lib/kmon'
import { formatDistanceToNow } from '../../lib/date'
import { Props } from './Bid.types'
import './Bid.css'

const Bid = (props: Props) => {
  const {
    bid,
    wallet,
    archivedBidIds,
    onAccept,
    onArchive,
    onUnarchive,
    onCancel,
    onUpdate,
    isArchivable,
    hasImage
  } = props

  const isArchived = archivedBidIds.includes(bid.id)
  const isBidder = !!wallet && addressEquals(wallet.address, bid.bidder)
  const isSeller = !!wallet && addressEquals(wallet.address, bid.seller)

  const contractNames = getContractNames()

  const { address: kmonAddress } = getContract({
    name: contractNames.KMONToken
  })
  const { address: wbnbAddress } = getContract({
    name: contractNames.WBNB
  })

  let coin: Coin | null = null
  if (bid.paymentToken?.toLowerCase() === kmonAddress.toLowerCase()) {
    coin = Coin.KMON
  } else if (bid.paymentToken?.toLowerCase() === wbnbAddress.toLowerCase()) {
    coin = Coin.WBNB
  } else {
    throw new Error(`Invalid payment token ${bid.paymentToken} in a Bid ${bid.tokenId}`)
  }

  const handleAccept = useCallback(() => onAccept(bid), [bid, onAccept])

  return (
    <div className="Bid">
      <div className="bid-row">
        {hasImage ? (
          <div className="image">
            <NFTProvider
              contractAddress={bid.contractAddress}
              tokenId={bid.tokenId}
            >
              {(nft, isLoading) => (
                <>
                  {!nft && isLoading ? <Loader active /> : null}
                  {nft ? (
                    <Link to={locations.nft(bid.contractAddress, bid.tokenId)}>
                      <NFTImage nft={nft} />{' '}
                    </Link>
                  ) : null}
                </>
              )}
            </NFTProvider>
          </div>
        ) : null}
        <div className="wrapper">
          <div className="info">
            <Stats className="from" title={t('bid.from')}>
              <Link to={locations.account(bid.bidder)}>
                <Profile address={bid.bidder} />
              </Link>
            </Stats>
            <Stats title={t('bid.price')}>
              <CoinPopup coin={coin}>{formatCoin(bid.price)}</CoinPopup>
            </Stats>
            <Stats title={t('bid.time_left')}>
              {formatDistanceToNow(+bid.expiresAt)}
            </Stats>
          </div>
          {isBidder || isSeller ? (
            <div className="actions">
              {isBidder ? (
                <>
                  <Button primary onClick={() => onUpdate(bid)}>
                    {t('global.update')}
                  </Button>
                  <Button onClick={() => onCancel(bid)}>
                    {t('global.cancel')}
                  </Button>
                </>
              ) : null}
              {isSeller ? (
                <>
                  <NFTProvider
                    contractAddress={bid.contractAddress}
                    tokenId={bid.tokenId}
                  >
                    {nft => (
                      <AcceptButton
                        nft={nft}
                        bid={bid}
                        coin={coin}
                        onClick={handleAccept}
                      />
                    )}
                  </NFTProvider>

                  {isArchivable ? (
                    !isArchived ? (
                      <Button onClick={() => onArchive(bid)}>
                        {t('my_bids_page.archive')}
                      </Button>
                    ) : (
                      <Button onClick={() => onUnarchive(bid)}>
                        {t('my_bids_page.unarchive')}
                      </Button>
                    )
                  ) : null}
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {isBidder ? (
        <NFTProvider
          contractAddress={bid.contractAddress}
          tokenId={bid.tokenId}
        >
          {nft => <WarningMessage nft={nft} bid={bid} coin={coin} />}
        </NFTProvider>
      ) : null}
    </div>
  )
}

Bid.defaultProps = {
  isArchivable: true,
  hasImage: true
}

export default React.memo(Bid)
