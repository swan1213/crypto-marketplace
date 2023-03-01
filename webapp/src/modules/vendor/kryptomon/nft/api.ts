import { NFTsFetchParams, NFTGenesV2 } from '../../../nft/types'
import { NFTsFetchFilters, NFTResponse } from './types'
import { Contract } from '../../services'
import { contracts } from '../../../contract/utils'
import { VendorName } from '../../types'
import {
  GENERATION_TO_REQ,
  SEX_TO_REQ,
  SKIN_TYPE_TO_REQ,
  STATUS_TO_REQ,
  UNFREEZABLE_TO_REQ
} from '../../decentraland/nft/utils'
import { SEARCH_ARRAY_PARAM_SEPARATOR } from '../../../routing/search'
import { toWei } from 'web3x-es/utils'
import { getSortBy } from '../../../nft/utils'

export const NFT_SERVER_URL = process.env.REACT_APP_NFT_SERVER_URL!
export const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL!

class NFTAPI {
  fetch = async (params: NFTsFetchParams, filters?: NFTsFetchFilters) => {
    const queryParams = this.buildQueryString(params, filters)
    const response: NFTResponse = await fetch(
      `${NFT_SERVER_URL}/v1/nfts?${queryParams}`
    ).then(resp => resp.json())
    console.log(response);
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

  async fetchOneV2(tokenId: string) {
    try {
      const response: { genes: NFTGenesV2 } = await fetch(
        `https://api-yt9bz.ondigitalocean.app/kryptomon/${tokenId}`
      ).then(resp => resp.json())

      return response
    } catch (error) {
      console.log(error)
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
          vendor: VendorName.KRYPTOMON
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

    if (params.orderBy) {
      queryParams.append(
        'sortBy',
        getSortBy(params.orderBy, params.orderDirection)
      )
    }
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
      if (GENERATION_TO_REQ[params.section]) {
        queryParams.set('generation', GENERATION_TO_REQ[params.section])
      }
      queryParams.set('section', params.section)
    }
    if (params.kryptomonStatus) {
      if (STATUS_TO_REQ[params.kryptomonStatus]) {
        queryParams.set(
          'kryptomonStatus',
          STATUS_TO_REQ[params.kryptomonStatus]
        )
      }
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
    if (params.price) {
      const data = params.price
        .split(SEARCH_ARRAY_PARAM_SEPARATOR)
        .map(el => toWei(el, 'ether'))
        .join(SEARCH_ARRAY_PARAM_SEPARATOR)
      queryParams.set('price', data)
    }
    if (params.priceToken) {
      queryParams.set('priceToken', params.priceToken)
    }
    if (params.affection) {
      queryParams.set('affection', params.affection)
    }
    if (params.unfreezable) {
      const formatedUnfreezable = params.unfreezable
        .split('_')
        .map(elem => UNFREEZABLE_TO_REQ[elem])
      if (formatedUnfreezable.length === 1) {
        queryParams.set('unfreezable', formatedUnfreezable.join('_'))
      }
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
    if (params.sex) {
      queryParams.set('sex', params.sex)
    }
    if (params.skinType) {
      queryParams.set('skinType', params.skinType)
    }
    if (params.bodySize) {
      queryParams.set('bodySize', params.bodySize)
    }
    if (params.ego) {
      queryParams.set('ego', params.ego)
    }
    if (params.healthPoints) {
      queryParams.set('healthPoints', params.healthPoints)
    }
    if (params.speed) {
      queryParams.set('speed', params.speed)
    }
    if (params.skinType) {
      const formatedSkinTypes = params.skinType
        .split('_')
        .map(elem => SKIN_TYPE_TO_REQ[elem])
      queryParams.set('skinType', formatedSkinTypes.join('_'))
    }
    if (params.sex) {
      if (SEX_TO_REQ[params.sex]) {
        queryParams.set('sex', SEX_TO_REQ[params.sex])
      }
    }
    if (params.orderStatus) {
      queryParams.set('orderStatus', params.orderStatus)
    }
    if (params.water) {
      queryParams.set('water', params.water)
    }
    if (params.waterTalent) {
      queryParams.set('waterTalent', params.waterTalent)
    }
    if (params.fire) {
      queryParams.set('fire', params.fire)
    }
    if (params.fireTalent) {
      queryParams.set('fireTalent', params.fireTalent)
    }
    if (params.ground) {
      queryParams.set('ground', params.ground)
    }
    if (params.groundTalent) {
      queryParams.set('groundTalent', params.groundTalent)
    }
    if (params.ice) {
      queryParams.set('ice', params.ice)
    }
    if (params.iceTalent) {
      queryParams.set('iceTalent', params.iceTalent)
    }
    if (params.grass) {
      queryParams.set('grass', params.grass)
    }
    if (params.grassTalent) {
      queryParams.set('grassTalent', params.grassTalent)
    }
    if (params.electro) {
      queryParams.set('electro', params.electro)
    }
    if (params.electroTalent) {
      queryParams.set('electroTalent', params.electroTalent)
    }
    if (params.ghost) {
      queryParams.set('ghost', params.ghost)
    }
    if (params.ghostTalent) {
      queryParams.set('ghostTalent', params.ghostTalent)
    }
    if (params.air) {
      queryParams.set('air', params.air)
    }
    if (params.airTalent) {
      queryParams.set('airTalent', params.airTalent)
    }
    if (params.color) {
      queryParams.set('color', params.color)
    }
    if (params.attack) {
      queryParams.set('attack', params.attack)
    }
    if (params.defence) {
      queryParams.set('defence', params.defence)
    }
    if (params.generalTalent) {
      queryParams.set('generalTalent', params.generalTalent)
    }
    if (params.growthTalentFactor) {
      queryParams.set('growthTalentFactor', params.growthTalentFactor)
    }
    if (params.elementPercentage) {
      queryParams.set('elementPercentage', params.elementPercentage)
    }
    if (params.special) {
      queryParams.set('special', params.special)
    }
    if (params.isInBreedingCentre) {
      queryParams.append('isInBreedingCentre', `${params.isInBreedingCentre}`)
    }
    if (params.owner) {
      queryParams.append('owner', `${params.owner}`)
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
