import { NFTsFetchParams } from '../../../nft/types'
import { NFTsFetchFilters, NFTResponse } from './types'
import { ATLAS_SERVER_URL } from '../land'
import { Contract } from '../../services'
import { contracts } from '../../../contract/utils'
import { VendorName } from '../../types'

export const NFT_SERVER_URL = process.env.REACT_APP_NFT_SERVER_URL!

class NFTAPI {
  fetch = async (params: NFTsFetchParams, filters?: NFTsFetchFilters) => {
    const queryParams = this.buildQueryString(params, filters)

    const response: NFTResponse = await fetch(
      `${NFT_SERVER_URL}/v1/nfts?${queryParams}`
    ).then(resp => resp.json())

    return response
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    const response: NFTResponse = await fetch(
      `${NFT_SERVER_URL}/v1/nfts?contractAddress=${contractAddress}&tokenId=${tokenId}`
    ).then(resp => resp.json())
    if (response.data.length === 0) {
      throw new Error('Not found')
    }
    return response.data[0]
  }

  async fetchTokenId(x: number, y: number) {
    try {
      const { id } = await fetch(
        `${ATLAS_SERVER_URL}/v2/parcels/${x}/${y}`
      ).then(resp => resp.json())
      return id
    } catch (error) {
      return null
    }
  }

  async fetchContracts() {
    try {
      const response: {
        data: Omit<Contract, 'vendor'>[]
        total: number
      } = await fetch(
        `${NFT_SERVER_URL}/v1/contracts?first=0` // first=0 so it returns all the results
      ).then(resp => resp.json())
      const contracts: Contract[] = response.data.map(
        contractWithoutVendor => ({
          ...contractWithoutVendor,
          vendor: VendorName.DECENTRALAND
        })
      )
      return contracts
    } catch (error) {
      return []
    }
  }

  private buildQueryString(
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters
  ): string {
    const queryParams = new URLSearchParams()

    queryParams.append('first', params.first.toString())
    queryParams.append('skip', params.skip.toString())
    // if (params.orderBy) {
    //   queryParams.append('sortBy', getSortBy(params.orderBy))
    // }
    if (params.category) {
      queryParams.append('category', params.category)
    }
    if (params.address) {
      queryParams.append('owner', params.address)
    }

    if (params.onlyOnSale) {
      queryParams.append('isOnSale', `${params.onlyOnSale}`)
    }
    if (params.search) {
      queryParams.set('search', params.search)
    }
    if (params.section) {
      queryParams.set('section', params.section)
    }
    if (params.kryptomonStatus) {
      queryParams.set('kryptomonStatus', params.kryptomonStatus)
    }
    if (params.elemTypes) {
      queryParams.set('elemTypes', params.elemTypes)
    }
    if (params.specialties) {
      queryParams.set('specialties', params.specialties)
    }
    if (params.supers) {
      queryParams.set('supers', params.supers)
    }
    if (params.generation) {
      queryParams.set('generation', params.generation)
    }
    if (params.affection) {
      queryParams.set('affection', params.affection)
    }
    if (params.braveness) {
      queryParams.set('braveness', params.braveness)
    }
    if (params.constitution) {
      queryParams.set('constitution', params.constitution)
    }
    if (params.craziness) {
      queryParams.set('craziness', params.craziness)
    }
    if (params.hunger) {
      queryParams.set('hunger', params.hunger)
    }
    if (params.instinct) {
      queryParams.set('instinct', params.instinct)
    }
    if (params.smart) {
      queryParams.set('smart', params.smart)
    }
    if (params.elementStartingTalent) {
      queryParams.set('elementStartingTalent', params.elementStartingTalent)
    }
    if (params.laziness) {
      queryParams.set('laziness', params.laziness)
    }
    if (filters) {
      if (filters.isLand) {
        // queryParams.append('isLand', 'true')
      }
      if (filters.isWearableHead) {
        queryParams.append('isWearableHead', 'true')
      }
      if (filters.isWearableAccessory) {
        queryParams.append('isWearableAccessory', 'true')
      }
      if (filters.wearableCategory) {
        queryParams.append('wearableCategory', filters.wearableCategory)
      }
      if (filters.wearableRarities) {
        for (const wearableRarity of filters.wearableRarities) {
          queryParams.append('wearableRarity', wearableRarity)
        }
      }
      if (filters.contracts) {
        for (const address of filters.contracts) {
          if (contracts.some(contract => contract.address === address)) {
            queryParams.append('contractAddress', address)
          }
        }
      }
      if (filters.network) {
        queryParams.append('network', filters.network)
      }
    }

    return queryParams.toString()
  }
}

export const nftAPI = new NFTAPI()
