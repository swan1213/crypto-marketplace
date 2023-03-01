import { NFT, Order, Count } from '../../entities/schema'
import * as categories from '../category/categories'
import * as addresses from '../../data/addresses'

export const DEFAULT_ID = 'all'

export function buildCount(): Count {
  let count = Count.load(DEFAULT_ID)

  if (count == null) {
    count = new Count(DEFAULT_ID)
    count.orderTotal = 0
    count.orderKryptomon = 0

    count.kryptomonTotal = 0

    count.started = 0
  }

  return count as Count
}

export function buildCountFromNFT(nft: NFT): Count {
  let category = nft.category
  let count = buildCount()

  if (category == categories.KRYPTOMON) {
    count.kryptomonTotal += 1
  }

  return count
}

export function buildCountFromOrder(order: Order): Count {
  let category = order.category
  let count = buildCount()
  count.orderTotal += 1

  if (category == categories.KRYPTOMON) {
    count.orderKryptomon += 1
  }

  return count
}
