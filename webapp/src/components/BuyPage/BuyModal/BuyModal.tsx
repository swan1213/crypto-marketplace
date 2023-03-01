import React, { useState, useCallback } from 'react'
import { Header, Button } from '@kmon/ui'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'
import {
  Authorization,
  AuthorizationType
} from '@kmon/dapps/dist/modules/authorization/types'
import { hasAuthorization } from '@kmon/dapps/dist/modules/authorization/utils'
import { Coin, Network } from '@kmon/schemas'
import { Address } from 'web3x-es/address'
import { ContractName } from '@kmon/transactions'
import { locations } from '../../../modules/routing/locations'
import { getNFTName } from '../../../modules/nft/utils'
import { useFingerprint, useComputedPrice } from '../../../modules/nft/hooks'
import { NFT } from '../../../modules/nft/types'
import { getContractNames } from '../../../modules/vendor'
import { getContract } from '../../../modules/contract/utils'
import { NFTAction } from '../../NFTAction'
import { CoinPopup } from '../../CoinPopup'
import { AuthorizationModal } from '../../AuthorizationModal'
import { Props } from './BuyModal.types'
import { formatCoin } from '../../../lib/kmon'

const BuyPage = (props: Props) => {
  const {
    nft,
    order,
    wallet,
    authorizations,
    isLoading,
    onNavigate,
    onExecuteOrder,
    isOwner,
    hasInsufficientCoin
  } = props

  const [fingerprint, isFingerprintLoading] = useFingerprint(nft)
  const [
    computedPrice,
    percentageIncrease,
    isAboveMaxPercentage
  ] = useComputedPrice(nft, order)
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)
  const [wantsToProceed, setWantsToProceed] = useState(false)

  const handleExecuteOrder = useCallback(() => {
    if (order === null) return
    onExecuteOrder(order, nft, order.paymentToken, fingerprint)
  }, [order, nft, fingerprint, onExecuteOrder])

  if (!wallet) {
    return null
  }
  const contractNames = getContractNames()
  const kmon = getContract({
    name: contractNames.KMONToken
  })
  const marketplace = getContract({
    name: contractNames.MARKETPLACE
  })
  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: marketplace.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: nft.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const handleToggleWantsToProceed = () => {
    setWantsToProceed(!wantsToProceed)
  }

  const handleSubmit = () => {
    if (order?.paymentToken === Address.ZERO.toString() || hasAuthorization(authorizations, authorization)) {
      handleExecuteOrder()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const isDisabled =
    !order ||
    isOwner ||
    hasInsufficientCoin
  // || (!fingerprint && nft.category === NFTCategory.KRYPTOMON)

  const name = <Name nft={nft} />

  let subtitle = null
  if (!order) {
    subtitle = <T id={'buy_page.not_for_sale'} values={{ name }} />
  }
  // else if (
  //   !fingerprint &&
  //   nft.category === NFTCategory.KRYPTOMON &&
  //   !isFingerprintLoading
  // ) {
  //   subtitle = <T id={'buy_page.no_fingerprint'} />
  // }
  else if (isOwner) {
    subtitle = <T id={'buy_page.is_owner'} values={{ name }} />
  } else if (hasInsufficientCoin) {
    const coin = order.paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON
    subtitle = (
      <T
        id={'buy_page.not_enough_coin'}
        values={{
          coin: coin,
          name,
          amount:
            <Price
              network={nft.network}
              price={order.price}
              coin={coin}
            />
        }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'buy_page.subtitle'}
        values={{
          name,
          amount:
            <Price
              network={nft.network}
              price={order.price}
              coin={order.paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON}
            />
        }}
      />
    )
  }

  return (
    <NFTAction nft={nft}>
      <Header size="large">
        {t('buy_page.title', { category: t(`global.${nft.category}`) })}
      </Header>
      <div className={isDisabled ? 'error' : ''}>{subtitle}</div>
      <div className="buttons">
        <Button
          onClick={() =>
            onNavigate(locations.nft(nft.contractAddress, nft.tokenId))
          }
        >
          {t('global.cancel')}
        </Button>

        {isDisabled ||
          !isAboveMaxPercentage ||
          (isAboveMaxPercentage && wantsToProceed) ? (
          <Button
            primary
            disabled={isDisabled || isLoading}
            onClick={handleSubmit}
            loading={isLoading}
          >
            {t('buy_page.buy')}
          </Button>
        ) : (
          <Button
            primary
            onClick={handleToggleWantsToProceed}
            loading={isLoading}
          >
            {t('buy_page.proceed_anyways')}
          </Button>
        )}
      </div>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        onProceed={handleExecuteOrder}
        onCancel={handleClose}
      />
    </NFTAction>
  )
}

const Name = (props: { nft: NFT }) => <b>{getNFTName(props.nft)}</b>

const Price = (props: { network?: Network; price: string, coin: Coin }) => (
  <CoinPopup network={props.network} inline withTooltip coin={props.coin}>
    {formatCoin(props.price)}
  </CoinPopup>
)

export default React.memo(BuyPage)
