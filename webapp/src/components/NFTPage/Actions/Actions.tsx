import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Network } from '@kmon/schemas'
import { Modal, Button } from '@kmon/ui'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'

import { isOwnedBy } from '../../../modules/nft/utils'
import { locations } from '../../../modules/routing/locations'
import { VendorFactory } from '../../../modules/vendor'
import { Props } from './Actions.types'
import './Actions.css'
import { toWei } from 'web3x-es/utils'
import { BreedPriceModal } from '../BreedPriceModal'

const Actions = (props: Props) => {
  const {
    wallet,
    authorizations,
    nft,
    order,
    bids,
    isAddingToBreedingCentre,
    currentNFTBreedingOrder,
    isCancelingBreed,
    showBreedPriceModal,
    onAddToBreedingCentre,
    onNavigate,
    onResetMyNFT,
    onCancelListing,
    onShowBreedPriceModal
  } = props
  const { vendor, contractAddress, tokenId } = nft

  const [showLeavingSiteModal, setShowLeavingSiteModal] = useState(false)

  const { bidService, orderService } = VendorFactory.build(nft.vendor)
  const isBiddable = bidService !== undefined

  const isOwner = isOwnedBy(nft, wallet)
  const canBreed = isOwner && nft.data.kryptomon!.timeCanBreed && nft.data.kryptomon!.timeCanBreed * 1000 < Date.now();
  if (!isOwner || !canBreed) {
    onResetMyNFT();
  }

  const canSell = orderService.canSell()
  const canBid =
    !isOwner &&
    isBiddable &&
    nft.network === Network.BSC &&
    (!wallet || !bids.some(bid => bid.bidder === wallet.address))

  const [screen, setScreen] = useState(0);

  useEffect(() => {
    window.innerWidth > 992 || window.innerWidth < 769 ? setScreen(0) : setScreen(1);
    function handleResize() {
      window.innerWidth > 992 || window.innerWidth < 769 ? setScreen(0) : setScreen(1);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleClickBreedingOrder = () => {
    onShowBreedPriceModal(true)
  }

  const handleClickBreed = () => {
    onNavigate(locations.breed(nft.contractAddress, nft.tokenId))
  }

  const handleSubmitBreedPrice = (breedPrice: string) => {
    onAddToBreedingCentre(nft.contractAddress, nft.tokenId, toWei(breedPrice, 'ether'))
  }

  const handleCancelListing = () => {
    onCancelListing(nft.contractAddress, nft.tokenId)
  }

  return (
    <>
      {
        canBreed && (
          <Button
            onClick={handleClickBreed}
            primary
          >
            {t('nft_page.breed')}
          </Button>
        )
      }
      {
        canBreed && (
          <Button
            onClick={handleClickBreedingOrder}
            primary
          >
            {t('nft_page.breeding_order')}
          </Button>
        )
      }
      {order ? (
        isOwner && canSell ? (
          <>
            <Button
              as={Link}
              to={locations.sell(contractAddress, tokenId)}
              primary
              className='update-button'
            >
              {t('nft_page.update')}
            </Button>
            <Button as={Link} to={locations.cancel(contractAddress, tokenId)}>
              {t('nft_page.cancel_sale')}
            </Button>
          </>
        ) : !isOwner ? (
          <>
            {
              screen == 1 ? (
                <Button
                  as={Link}
                  to={locations.buy(contractAddress, tokenId)}
                  primary
                  style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', display: 'flex', justifyContent: "center", alignItems: 'center' }}
                >
                  {t('nft_page.buy')}
                </Button>
              ) : (
                <Button
                  as={Link}
                  to={locations.buy(contractAddress, tokenId)}
                  primary
                >
                  {t('nft_page.buy')}
                </Button>
              )
            }
            {canBid ? screen == 1 ? (
              <Button as={Link} to={locations.bid(contractAddress, tokenId)} className='bidbutton'
                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', display: 'flex', justifyContent: "center", alignItems: 'center' }}
              >
                {t('nft_page.bid')}
              </Button>
            ) : (
              <Button as={Link} to={locations.bid(contractAddress, tokenId)} className='bidbutton'>
                {t('nft_page.bid')}
              </Button>
            ) : null}
          </>
        ) : (
          <Button onClick={() => setShowLeavingSiteModal(true)} primary>
            {t('nft_page.see_listing')}
          </Button>
        )
      ) : isOwner && canSell ? (
        <Button as={Link} to={locations.sell(contractAddress, tokenId)} primary className='update-button'>
          {t('nft_page.sell')}
        </Button>
      ) : isOwner && !canSell ? (
        <Button onClick={() => setShowLeavingSiteModal(true)} primary>
          {t('nft_page.sell')}
        </Button>
      ) : canBid ? (
        <Button as={Link} to={locations.bid(contractAddress, tokenId)} primary>
          {t('nft_page.bid')}
        </Button>
      ) : null}
      {
        isOwner && !order ? (
          <Button as={Link} to={locations.transfer(contractAddress, tokenId)}>
            {t('nft_page.transfer')}
          </Button>
        ) : null
      }

      <Modal
        className="LeavingSiteModal"
        size="small"
        open={showLeavingSiteModal}
        onClose={() => setShowLeavingSiteModal(false)}
      >
        <Modal.Header>{t('nft_page.leaving_decentraland')}</Modal.Header>
        <Modal.Content>
          <p>
            <T
              id="nft_page.leaving_decentraland_description"
              values={{
                vendor: t(`vendors.${vendor}`),
                vendor_link: (
                  <a href={nft.url} target="_blank" rel="noopener noreferrer">
                    {nft.url}
                  </a>
                )
              }}
            />
            <br />
            <br />
            <small>
              <i>{t('nft_page.leaving_decentraland_disclaimer')}</i>
            </small>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowLeavingSiteModal(false)}>
            {t('global.cancel')}
          </Button>
          <Button
            primary
            as="a"
            href={nft.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowLeavingSiteModal(false)}
          >
            {t('global.proceed')}
          </Button>
        </Modal.Actions>
      </Modal>

      <BreedPriceModal
        wallet={wallet}
        authorizations={authorizations}
        show={showBreedPriceModal}
        nft={nft}
        isOwner={isOwner}
        isAddingToBreedingCentre={isAddingToBreedingCentre}
        currentNFTBreedingOrder={currentNFTBreedingOrder}
        isCancelingBreed={isCancelingBreed}
        onSubmitBreedPrice={handleSubmitBreedPrice}
        onCancel={() => onShowBreedPriceModal(false)}
        onCancelListing={handleCancelListing}
      />
    </>
  )
}

export default React.memo(Actions)
