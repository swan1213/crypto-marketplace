import React, { useState, useCallback, useEffect } from 'react'
import { Coin, Network } from '@kmon/schemas'
import { Header, Form, Field, Button } from '@kmon/ui'
import { ContractName } from '@kmon/transactions'
import { t, T } from '@kmon/dapps/dist/modules/translation/utils'
import {
  Authorization,
  AuthorizationType
} from '@kmon/dapps/dist/modules/authorization/types'
import { hasAuthorization } from '@kmon/dapps/dist/modules/authorization/utils'
import { toCoin, fromCoin } from '../../../lib/kmon'
import { NFTAction } from '../../NFTAction'
import { getNFTName, isOwnedBy } from '../../../modules/nft/utils'
import { getDefaultExpirationDate } from '../../../modules/order/utils'
import { locations } from '../../../modules/routing/locations'
import { useFingerprint } from '../../../modules/nft/hooks'
import { AuthorizationModal } from '../../AuthorizationModal'
import { getContract } from '../../../modules/contract/utils'
import { getContractNames } from '../../../modules/vendor'
import { CoinField } from '../../CoinField'
import { Props } from './BidModal.types'
import './BidModal.css'
import { CoinSelectField } from '../../CoinSelectField'
import { toDecimal } from '../../../lib/number'

const BidModal = (props: Props) => {
  const {
    nft,
    wallet,
    authorizations,
    onNavigate,
    onPlaceBid,
    isPlacingBid
  } = props

  const [price, setPrice] = useState('')
  const [expiresAt, setExpiresAt] = useState(getDefaultExpirationDate())
  const [paymentCoin, setPaymentCoin] = useState(Coin.KMON)
  const [fingerprint, isLoading] = useFingerprint(nft)
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const contractNames = getContractNames()
  const kmon = getContract({
    name: contractNames.KMONToken
  })
  const wbnb = getContract({
    name: contractNames.WBNB
  })
  const handlePlaceBid = useCallback(() => {
    const coinAddress = paymentCoin === Coin.KMON ? kmon.address : wbnb.address
    onPlaceBid(nft, fromCoin(price, paymentCoin), coinAddress, +new Date(expiresAt), fingerprint)
  }, [nft, price, paymentCoin, expiresAt, fingerprint, onPlaceBid])

  if (!wallet) {
    return null
  }
  const erc721Bid = getContract({
    name: contractNames.ERC721Bid
  })
  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: erc721Bid.address,
    contractAddress: paymentCoin === Coin.KMON ? kmon.address : wbnb.address,
    contractName: paymentCoin === Coin.KMON ? ContractName.KMONToken : ContractName.WBNB,
    chainId: paymentCoin === Coin.KMON ? kmon.chainId : wbnb.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const handleSubmit = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handlePlaceBid()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const isInvalidDate = +new Date(expiresAt) < Date.now()
  const hasInsufficientCoin = (): boolean => {
    if (paymentCoin === Coin.KMON) {
      return !!price && !!wallet && fromCoin(price, paymentCoin) > wallet.networks[Network.BSC].kmonBalance
    } else if (paymentCoin === Coin.WBNB) {
      return !!price && !!wallet && fromCoin(price, paymentCoin) > wallet.networks[Network.BSC].wbnbBalance
    }
    return false
  }

  return (
    <NFTAction nft={nft}>
      <Header size="large">{t('bid_page.title')}</Header>
      <p className="subtitle">
        <T
          id={'bid_page.subtitle'}
          values={{
            name: <b className="primary-text">{getNFTName(nft)}</b>
          }}
        />
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="form-fields">
          <CoinSelectField
            coin={Coin.WBNB}
            onChangeCoin={(c) => setPaymentCoin(c)}
            defaultCoin={paymentCoin}
          />
          <CoinField
            coin={paymentCoin}
            label={t('bid_page.price')}
            placeholder={toCoin(1000)}
            value={price}
            onChange={(_event, props) => {
              if (paymentCoin === Coin.WBNB) {
                setPrice(toDecimal(props.value))
              } else {
                const newPrice = fromCoin(props.value, paymentCoin)
                setPrice(toCoin(newPrice))
              }
            }}
            error={hasInsufficientCoin()}
            message={
              hasInsufficientCoin() ? t('bid_page.not_enough_coin', { coin: paymentCoin }) : undefined
            }
          />
          <Field
            label={t('bid_page.expiration_date')}
            type="date"
            value={expiresAt}
            onChange={(_event, props) =>
              setExpiresAt(props.value || getDefaultExpirationDate())
            }
            error={isInvalidDate}
            message={isInvalidDate ? t('bid_page.invalid_date') : undefined}
          />
        </div>
        <div className="buttons">
          <Button
            as="div"
            onClick={() =>
              onNavigate(locations.nft(nft.contractAddress, nft.tokenId))
            }
          >
            {t('global.cancel')}
          </Button>
          <Button
            type="submit"
            primary
            loading={isPlacingBid}
            disabled={
              isOwnedBy(nft, wallet) ||
              fromCoin(price, paymentCoin) <= 0 ||
              isInvalidDate ||
              hasInsufficientCoin() ||
              isLoading ||
              isPlacingBid
            }
          >
            {t('bid_page.submit')}
          </Button>
        </div>
      </Form>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        isLoading={isPlacingBid}
        onProceed={handlePlaceBid}
        onCancel={handleClose}
      />
    </NFTAction>
  )
}

export default React.memo(BidModal)
