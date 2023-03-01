import React from 'react'
import { Link } from 'react-router-dom'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'
import { TransactionLink, Profile } from '@kmon/dapps/dist/containers'
import {
  GrantTokenSuccessAction,
  GRANT_TOKEN_SUCCESS,
  REVOKE_TOKEN_SUCCESS
} from '@kmon/dapps/dist/modules/authorization/actions'
import { fromWei } from 'web3x-es/utils'
import { Address } from 'web3x-es/address'
import { Coin } from '@kmon/schemas'

import { getNFTName } from '../../../modules/nft/utils'
import {
  CREATE_ORDER_SUCCESS,
  CANCEL_ORDER_SUCCESS,
  EXECUTE_ORDER_SUCCESS
} from '../../../modules/order/actions'
import { TRANSFER_NFT_SUCCESS } from '../../../modules/nft/actions'
import {
  PLACE_BID_SUCCESS,
  ACCEPT_BID_SUCCESS,
  CANCEL_BID_SUCCESS
} from '../../../modules/bid/actions'
import { locations } from '../../../modules/routing/locations'
import { getContract } from '../../../modules/contract/utils'
import { NFTProvider } from '../../NFTProvider'
import { CoinPopup } from '../../CoinPopup'
import { TransactionDetail } from './TransactionDetail'
import { Props } from './Transaction.types'
import { BUY_ITEM_SUCCESS, BUY_ITEM_WITH_CANDIES_SUCCESS } from '../../../modules/item/actions'
import { getContractNames } from '../../../modules/vendor'
import { KIcon } from '@kmon/ui'

const Transaction = (props: Props) => {
  const { tx } = props
  console.log('Top', tx)
  switch (tx.actionType) {
    case GRANT_TOKEN_SUCCESS: {
      const { authorization } = tx.payload as GrantTokenSuccessAction['payload']
      const authorized = getContract({
        address: authorization.authorizedAddress
      })
      const contract = getContract({ address: authorization.contractAddress })
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.approve_token"
              values={{
                action: t('transaction.action.approved'),
                contract: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={authorized.address}
                    txHash=""
                  >
                    {authorized.name}
                  </TransactionLink>
                ),
                token: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={contract.address}
                    txHash=""
                  >
                    {contract.name}
                  </TransactionLink>
                )
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case REVOKE_TOKEN_SUCCESS: {
      const { authorization } = tx.payload as GrantTokenSuccessAction['payload']
      const authorized = getContract({
        address: authorization.authorizedAddress
      })
      const contract = getContract({ address: authorization.contractAddress })
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.approve_token"
              values={{
                action: t('transaction.action.not_approved'),
                contract: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={authorized.address}
                    txHash=""
                  >
                    {authorized.name}
                  </TransactionLink>
                ),
                token: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={contract.address}
                    txHash=""
                  >
                    {contract.name}
                  </TransactionLink>
                )
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case CREATE_ORDER_SUCCESS: {
      const { tokenId, contractAddress, network, name, price, paymentToken } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => {
            return (
              <TransactionDetail
                nft={nft}
                text={
                  <T
                    id="transaction.detail.create_order"
                    values={{
                      name: (
                        <Link to={locations.nft(contractAddress, tokenId)}>
                          {name}
                        </Link>
                      ),
                      price: (
                        <CoinPopup
                          network={network}
                          inline
                          coin={paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON}
                        >
                          {price.toLocaleString()}
                        </CoinPopup>
                      )
                    }}
                  />
                }
                tx={tx}
              />
            )
          }}
        </NFTProvider>
      )
    }
    case CANCEL_ORDER_SUCCESS: {
      const { tokenId, contractAddress, network, name, price, paymentToken } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.cancel_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: (
                      <CoinPopup
                        network={network}
                        inline
                        coin={paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON}
                      >
                        {price.toLocaleString()}
                      </CoinPopup>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case EXECUTE_ORDER_SUCCESS: {
      const { tokenId, contractAddress, network, name, price, paymentToken } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.execute_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: (
                      <CoinPopup
                        network={network}
                        inline
                        coin={paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON}
                      >
                        {price.toLocaleString()}
                      </CoinPopup>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case TRANSFER_NFT_SUCCESS: {
      const { tokenId, contractAddress, name, address } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.transfer"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    address: (
                      <Link to={locations.account(address)}>
                        <Profile address={address} />
                      </Link>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case PLACE_BID_SUCCESS: {
      const { tokenId, contractAddress, price, paymentToken } = tx.payload
      const contractNames = getContractNames()
      const kmon = getContract({
        name: contractNames.KMONToken,
      })

      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.place_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price:
                      <CoinPopup
                        inline
                        coin={paymentToken === kmon.address ? Coin.KMON : Coin.WBNB}
                      >
                        {price.toLocaleString()}
                      </CoinPopup>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case ACCEPT_BID_SUCCESS: {
      const { tokenId, contractAddress, price, paymentToken } = tx.payload
      const contractNames = getContractNames()
      const kmon = getContract({
        name: contractNames.KMONToken,
      })
      const wbnb = getContract({
        name: contractNames.WBNB,
      })
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.accept_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price:
                      <CoinPopup
                        inline
                        coin={
                          paymentToken?.toLowerCase() === kmon.address.toLowerCase() ?
                            Coin.KMON :
                            paymentToken?.toLowerCase() === wbnb.address.toLowerCase() ?
                              Coin.WBNB :
                              undefined
                        }
                      >
                        {price.toLocaleString()}
                      </CoinPopup>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case CANCEL_BID_SUCCESS: {
      const { tokenId, contractAddress, price, paymentToken } = tx.payload
      const contractNames = getContractNames()
      const kmon = getContract({
        name: contractNames.KMONToken,
      })
      const wbnb = getContract({
        name: contractNames.WBNB,
      })
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.cancel_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price:
                      <CoinPopup
                        inline
                        coin={
                          paymentToken?.toLowerCase() === kmon.address.toLowerCase() ?
                            Coin.KMON :
                            paymentToken?.toLowerCase() === wbnb.address.toLowerCase() ?
                              Coin.WBNB :
                              undefined
                        }
                      >
                        {price.toLocaleString()}
                      </CoinPopup>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case BUY_ITEM_SUCCESS: {
      const { item, count } = tx.payload
      const price = fromWei(item.price, 'ether')
      const calculatedPrice = Number(price) * count
      let itemName = item.name.replace(/_/g, ' ')
      itemName = itemName.replace(/basic/gi, 'bronze').toUpperCase()
      itemName = itemName.replace(/medium/gi, 'silver').toUpperCase()
      itemName = itemName.replace(/premium/gi, 'gold').toUpperCase()
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.buy_item"
              values={{
                count,
                name: itemName,
                price: <CoinPopup coin={Coin.KMON} inline>{calculatedPrice.toFixed(2)}</CoinPopup>
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case BUY_ITEM_WITH_CANDIES_SUCCESS: {
      console.log('Test', tx.payload)
      const { item, count } = tx.payload
      const price = fromWei(item.priceWithCandies, 'ether')
      const calculatedPrice = Number(price) * count
      let itemName = item.name.replace(/_/g, ' ')
      itemName = itemName.replace(/basic/gi, 'bronze').toUpperCase()
      itemName = itemName.replace(/medium/gi, 'silver').toUpperCase()
      itemName = itemName.replace(/premium/gi, 'gold').toUpperCase()
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.buy_item"
              values={{
                count,
                name: itemName,
                price: <KIcon icon="candy" inline>{calculatedPrice.toFixed(2)}</KIcon>
              }}
            />
          }
          tx={tx}
        />
      )
    }
    default:
      return null
  }
}

export default React.memo(Transaction)
