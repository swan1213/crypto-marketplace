import React from 'react'
import { t, T } from '@kmon/dapps/dist/modules/translation/utils'
import { Page, Header, Button } from '@kmon/ui'

import { locations } from '../../modules/routing/locations'
import { getNFTName } from '../../modules/nft/utils'
import { formatCoin } from '../../lib/kmon'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet } from '../Wallet'
import { CoinPopup } from '../CoinPopup'
import { NFTProviderPage } from '../NFTProviderPage'
import NFTAction from '../NFTAction/NFTAction'
import { Props } from './CancelSalePage.types'
import './CancelSalePage.css'

const CancelSalePage = (props: Props) => {
  const { isLoading, onNavigate, onCancelOrder } = props

  return (
    <>
      <Navbar isFullscreen />
      <Page className="CancelSalePage">
        <Wallet>
          {wallet => (
            <NFTProviderPage>
              {(nft, order) => {
                let subtitle
                let isDisabled = false
                const name = getNFTName(nft)
                if (!order) {
                  isDisabled = true
                  subtitle = (
                    <T
                      id="cancel_sale_page.not_for_sale"
                      values={{ name: <b>{name}</b> }}
                    />
                  )
                } else if (order.owner !== wallet.address) {
                  isDisabled = true
                  subtitle = (
                    <T
                      id="cancel_sale_page.invalid_owner"
                      values={{ name: <b>{name}</b> }}
                    />
                  )
                } else {
                  subtitle = (
                    <T
                      id="cancel_sale_page.subtitle"
                      values={{
                        name: <b>{name}</b>,
                        amount: (
                          <CoinPopup network={nft.network} inline>
                            {formatCoin(order.price)}
                          </CoinPopup>
                        )
                      }}
                    />
                  )
                }
                return (
                  <NFTAction nft={nft}>
                    <Header size="large">{t('cancel_sale_page.title')}</Header>
                    <div className="subtitle">{subtitle}</div>
                    <div className="buttons">
                      <Button
                        onClick={() =>
                          onNavigate(
                            locations.nft(nft.contractAddress, nft.tokenId)
                          )
                        }
                      >
                        {t('global.cancel')}
                      </Button>
                      <Button
                        primary
                        loading={isLoading}
                        disabled={isDisabled || isLoading}
                        onClick={() => onCancelOrder(order!, nft)}
                      >
                        {t('cancel_sale_page.submit')}
                      </Button>
                    </div>
                  </NFTAction>
                )
              }}
            </NFTProviderPage>
          )}
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(CancelSalePage)
