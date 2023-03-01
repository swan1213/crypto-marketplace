import { Address } from 'web3x-es/address'
import { Network } from '@kmon/schemas'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { ContractData, ContractName, getContract } from '@kmon/transactions'
import { ERC721 } from '../../../contracts/ERC721'
import { ContractFactory } from '../../contract/ContractFactory'
import { NFT, NFTsFetchParams, NFTsCountParams } from '../../nft/types'
import { sendTransaction } from '../../wallet/utils'
import { Account } from '../../account/types'
import ERC721Abi from '../../../contracts/ERC721Abi'
import { NFTService as NFTServiceInterface } from '../services'
import { KryptomonMetadataResponse, NFTsFetchFilters } from './nft/types'
import { VendorName } from '../types'
import { nftAPI } from './nft/api'
import { Order } from '../../order/types'
import { BreedingOrder } from '../../breedingOrder/types'

export class NFTService
  implements NFTServiceInterface<VendorName.DECENTRALAND> {
  async fetch(params: NFTsFetchParams, filters?: NFTsFetchFilters) {
    const { data: results, total } = await nftAPI.fetch(params, filters)

    const accounts: Account[] = []
    const nfts: NFT[] = []
    const orders: Order[] = []
    const breedingOrders: BreedingOrder[] = []
    for (const result of results) {
      const address = result.nft.owner
      let account = accounts.find(account => account.id === address)
      if (!account) {
        account = this.toAccount(address)
      }
      account.nftIds.push(result.nft.id)

      // setting metadata
      const metadata: KryptomonMetadataResponse = await fetch(
        result.nft.tokenURI
      ).then(resp => resp.json())
      result.nft.metadata = metadata

      nfts.push({ ...result.nft, vendor: VendorName.DECENTRALAND })
      if (result.order) {
        orders.push(result.order)
      }
    }

    return [nfts, accounts, orders, breedingOrders, total] as const
  }

  async count(countParams: NFTsCountParams, filters?: NFTsFetchFilters) {
    const result = await nftAPI.fetch(
      { ...countParams, first: 0, skip: 0 },
      filters
    )
    return result.total
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    const response = await nftAPI.fetchOne(contractAddress, tokenId)

    // setting metadata
    const metadata: KryptomonMetadataResponse = await fetch(
      response.nft.tokenURI
    ).then(resp => resp.json())
    response.nft.metadata = metadata

    const nft: NFT = { ...response.nft, vendor: VendorName.KRYPTOMON }
    return [nft, response.order || undefined, undefined] as const
  }

  async transfer(wallet: Wallet | null, toAddress: string, nft: NFT) {
    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    const from = Address.fromString(wallet.address)
    const to = Address.fromString(toAddress)

    const erc721 = await ContractFactory.build(ERC721, nft.contractAddress)
    const contract: ContractData = {
      name: 'ERC721',
      abi: ERC721Abi as any,
      address: nft.contractAddress,
      chainId: nft.chainId,
      version: '1'
    }

    const transferFrom = erc721.methods.transferFrom(from, to, nft.tokenId)
    return sendTransaction(transferFrom, contract, from)
  }

  toAccount(address: string): Account {
    return {
      id: address,
      address,
      nftIds: []
    }
  }
}
