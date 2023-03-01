import { log } from '@graphprotocol/graph-ts'
import { Transfer } from '../entities/templates/ERC721/ERC721'
import { NFT, Kryptomon, Order, } from '../entities/schema'
import {
  isMint,
  getNFTId,
  getTokenURI,
  cancelActiveOrder,
  clearNFTOrderProperties
} from '../modules/nft'
import { getCategory } from '../modules/category'
import { buildCountFromNFT } from '../modules/count'
import { createAccount } from '../modules/wallet'
import { toLowerCase } from '../modules/utils'
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'
import { buildKryptomonFromNFT, getKryptomonImage } from '../modules/kryptomon'

export function handleTransfer(event: Transfer): void {
  if (event.params.tokenId.toString() == '') {
    return
  }

  let contractAddress = event.address.toHexString()
  let category = getCategory(contractAddress)
  let id = getNFTId(
    category,
    event.address.toHexString(),
    event.params.tokenId.toString()
  )

  let nft = new NFT(id)

  nft.tokenId = event.params.tokenId
  nft.owner = event.params.to.toHex()
  nft.contractAddress = event.address
  nft.category = category
  nft.updatedAt = event.block.timestamp

  if (contractAddress != addresses.LANDRegistry) {
    // The LANDRegistry contract does not have a tokenURI method
    nft.tokenURI = getTokenURI(event)
  }

  if (isMint(event)) {
    nft.createdAt = event.block.timestamp

    // We're defaulting "Estate size" to one to allow the frontend to search for `searchEstateSize_gt: 0`,
    // necessary because thegraph doesn't support complex queries and we can't do `OR` operations
    // nft.searchEstateSize = 1

    // We default the "in bounds" property for parcels and no-parcels alike so we can just add  `searchParcelIsInBounds: true`
    // to all queries
    //nft.searchParcelIsInBounds = true

    nft.searchText = ''

    //nft.searchIsLand = false

    let metric = buildCountFromNFT(nft)
    metric.save()
  } else {
    let oldNFT = NFT.load(id)
    if (cancelActiveOrder(oldNFT!, event.block.timestamp)) {
      nft = clearNFTOrderProperties(nft!)
    }
  }

  if (category == categories.KRYPTOMON) {
    let kryptomon: Kryptomon
    if (isMint(event)) {
      kryptomon = buildKryptomonFromNFT(nft)
      nft.kryptomon = id
      nft.image = getKryptomonImage(kryptomon)
    } else {
      kryptomon = new Kryptomon(nft.id)
      kryptomon.owner = nft.owner
    }
    kryptomon.save()
  }

  createAccount(event.params.to)

  nft.save()
}
