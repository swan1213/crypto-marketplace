import React from 'react'
import { fromWei } from 'web3x-es/utils'
import { Page } from '@kmon/ui'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Address } from 'web3x-es/address'
import { Network } from '@kmon/schemas'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet as WalletProvider } from '../Wallet'
import { NFTProviderPage } from '../NFTProviderPage'
import { isOwnedBy } from '../../modules/nft/utils'
import { Order } from '../../modules/order/types'
import { BuyModal } from './BuyModal'
import { Props } from './BuyPage.types'
import './BuyPage.css'

const BuyPage = (props: Props) => {
  const {
    authorizations,
    isLoading,
    onNavigate,
    onExecuteOrder,
    isExecutingOrder
  } = props

  const isInsufficientCoin = (wallet: Wallet, order: Order | null) => {
    if (order === null) return false
    if (order.paymentToken === Address.ZERO.toString()) {
      return wallet.networks[Network.BSC].bnbBalance < +fromWei(order.price, 'ether')
    } else {
      return wallet.networks[Network.BSC].kmonBalance < +fromWei(order.price, 'ether')
    }
  }

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <WalletProvider>
          {wallet => (
            <NFTProviderPage>
              {(nft, order) => (
                <BuyModal
                  nft={nft}
                  order={order}
                  wallet={wallet}
                  authorizations={authorizations}
                  isLoading={isLoading || isExecutingOrder}
                  onNavigate={onNavigate}
                  onExecuteOrder={onExecuteOrder}
                  isOwner={isOwnedBy(nft, wallet)}
                  hasInsufficientCoin={isInsufficientCoin(wallet, order)}
                />
              )}
            </NFTProviderPage>
          )}
        </WalletProvider>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
