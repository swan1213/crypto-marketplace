import { getSearchParams } from './search'
import { SearchOptions } from './types'

export const locations = {
  root: () => '/',
  signIn: (returnPath?: string) => {
    return returnPath ? `/sign-in?returnPath=${returnPath}` : '/sign-in'
  },
  settings: () => '/settings',
  partners: () => '/partners',
  bids: () => '/bids',
  browse: (options?: SearchOptions) => {
    const params = getSearchParams(options)
    return params ? `/browse?${params.toString()}` : '/browse'
  },
  kryptomons: (options?: SearchOptions) => {
    const params = getSearchParams(options)
    return params ? `/kryptomons?${params.toString()}` : '/kryptomons'
  },
  currentAccount: (options?: SearchOptions) => {
    const params = getSearchParams(options)
    return params ? `/account?${params.toString()}` : '/account'
  },
  account: (address: string = ':address', options?: SearchOptions) => {
    const params = getSearchParams(options)
    return params
      ? `/accounts/${address}?${params.toString()}`
      : `/accounts/${address}`
  },
  nft: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}`,
  parcel: (x: string = ':x', y: string = ':y') => `/parcels/${x}/${y}/detail`,
  estate: (estateId: string = ':estateId') => `/estates/${estateId}/detail`,
  sell: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/sell`,
  buy: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/buy`,
  cancel: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/cancel`,
  transfer: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/transfer`,
  bid: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/contracts/${contractAddress}/tokens/${tokenId}/bid`,
  activity: () => `/activity`,
  items: () => `/items`,
  item: (id: string = ':id') => `/items/${id}`,
  breed: (
    contractAddress: string = ':contractAddress',
    tokenId: string = ':tokenId'
  ) => `/breed/contracts/${contractAddress}/tokens/${tokenId}`
}
