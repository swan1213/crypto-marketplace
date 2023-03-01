import { Address } from 'web3x-es/address'
import { Network } from '@kmon/schemas'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { ContractData, ContractName, getContract } from '@kmon/transactions'
import { ERC721 } from '../../../contracts/ERC721'
import { ContractFactory } from '../../contract/ContractFactory'
import { NFT, NFTsFetchParams, NFTsCountParams, NFTGenesV2 } from '../../nft/types'
import { sendTransaction } from '../../wallet/utils'
import { Account } from '../../account/types'
import ERC721Abi from '../../../contracts/ERC721Abi'
import { NFTService as NFTServiceInterface } from '../services'
import { KryptomonMetadataResponse, NFTsFetchFilters } from './nft/types'
import { VendorName } from '../types'
import { nftAPI } from './nft/api'
import { Order } from '../../order/types'
import { BreedingOrder } from '../../breedingOrder/types'

export class NFTService implements NFTServiceInterface<VendorName.KRYPTOMON> {
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

      if (params.isInBreedingCentre) {
        const responseV2 = await nftAPI.fetchOneV2(result.nft.tokenId)
        result.nft.genesV2 = this.getReorderedGenes(responseV2?.genes)
      }

      // setting metadata
      if (!result.nft.tokenURI) continue
      const metadata: KryptomonMetadataResponse = await fetch(
        result.nft.tokenURI
      ).then(resp => resp.json())
      result.nft.metadata = metadata

      if (metadata.image !== undefined) {
        nfts.push({ ...result.nft, vendor: VendorName.KRYPTOMON })

        if (result.order) {
          orders.push(result.order)
        }
        if (result.breedingOrder) {
          breedingOrders.push(result.breedingOrder)
        }
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
    const responseV2 = await nftAPI.fetchOneV2(tokenId)
    response.nft.genesV2 = this.getReorderedGenes(responseV2?.genes);

    // setting metadata
    const metadata: KryptomonMetadataResponse = await fetch(
      response.nft.tokenURI
    ).then(resp => resp.json())
    response.nft.metadata = metadata

    const nft: NFT = { ...response.nft, vendor: VendorName.KRYPTOMON }
    return [nft, response.order || undefined, response.breedingOrder || undefined] as const
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

  getReorderedGenes(newGenes?: NFTGenesV2) {
    const genes: NFTGenesV2 = {
      fire: 0,
      fireTalent: 0,
      water: 0,
      waterTalent: 0,
      ice: 0,
      iceTalent: 0,
      ground: 0,
      groundTalent: 0,
      air: 0,
      airTalent: 0,
      electro: 0,
      electroTalent: 0,
      ghost: 0,
      ghostTalent: 0,
      grass: 0,
      grassTalent: 0,
      color: 0,
      sex: 0,
      generalTalent: 0,
      attack: 0,
      defense: 0,
      special: 0,
      xFactor: 0,
      growthTalentFactor: 0,
      constitution: 0,
      healthPoints: 0,
      speed: 0,
      affections: 0,
      crazyness: 0,
      instinct: 0,
      hunger: 0,
      laziness: 0,
      brave: 0,
      smart: 0,
      bodySize: 0,
      ego: 0,
      skinType: 0,
      generation: 0,
    };
    return Object.assign(genes, newGenes);
  }
}
