import { Address } from 'web3x-es/address'
import { Eth } from 'web3x-es/eth'
import { getConnectedProvider } from '@kmon/dapps/dist/lib/eth'
import { Coin } from '@kmon/schemas'
import { KMONToken } from '../../contracts/KMONToken'
import { WBNB } from '../../contracts/WBNB'
import { Bid } from './types'

export async function isInsufficientCoin(bid: Bid, coin: Coin | null) {
  try {
    const provider = await getConnectedProvider()
    if (!provider) {
      throw new Error('Could not connect to provider')
    }
    const eth = new Eth(provider)

    if (coin === Coin.KMON) {
      const kmon = new KMONToken(eth, Address.fromString(bid.paymentToken))
      const balance = await kmon.methods
        .balanceOf(Address.fromString(bid.bidder))
        .call()

      return +balance < +bid.price
    } else if (coin === Coin.WBNB) {
      const wbnb = new WBNB(eth, Address.fromString(bid.paymentToken))
      const balance = await wbnb.methods
        .balanceOf(Address.fromString(bid.bidder))
        .call()

      return +balance < +bid.price
    } else {
      return false
    }

    
  } catch (error) {
    // @ts-ignore
    console.warn(error.message)
  }
  return false
}

export function checkFingerprint(bid: Bid, fingerprint: string | undefined) {
  if (fingerprint && bid.fingerprint) {
    return fingerprint === bid.fingerprint
  }
  return true
}

export function toBidObject(bids: Bid[]) {
  return bids.reduce((obj, bid) => {
    obj[bid.id] = bid
    return obj
  }, {} as Record<string, Bid>)
}
