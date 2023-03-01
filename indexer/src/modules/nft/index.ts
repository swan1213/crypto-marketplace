import { log, BigInt } from '@graphprotocol/graph-ts'
import { NFT, Order, Bid, BreedingOrder } from '../../entities/schema'
import { ERC721, Transfer } from '../../entities/templates/ERC721/ERC721'
import * as status from '../order/status'
import * as addresses from '../../data/addresses'
import { Birth } from '../../entities/KMONFT/KMONFT'

export function isMint(event: Transfer): boolean {
  return event.params.from.toHexString() == addresses.Null
}

export function getNFTId(
  category: string,
  contractAddress: string,
  tokenId: string
): string {
  return category + '-' + contractAddress + '-' + tokenId
}

export function getTokenURI(event: Transfer): string {
  let erc721 = ERC721.bind(event.address)
  let tokenURICallResult = erc721.try_tokenURI(event.params.tokenId)

  let tokenURI = ''

  if (tokenURICallResult.reverted) {
    log.warning('tokenURI reverted for tokenID: {} contract: {}', [
      event.params.tokenId.toString(),
      event.address.toHexString()
    ])
  } else {
    tokenURI = tokenURICallResult.value
  }

  return tokenURI
}

export function updateNFTOrderProperties(nft: NFT, order: Order): NFT {
  if (order.status == status.OPEN) {
    return addNFTOrderProperties(nft, order)
  } else if (order.status == status.SOLD || order.status == status.CANCELLED) {
    return clearNFTOrderProperties(nft)
  } else {
    return nft
  }
}

export function updateNFTBreedingOrderProperties(nft: NFT, order: BreedingOrder): NFT {
  if (order.status == status.OPEN) {
    return addNFTBreedingOrderProperties(nft, order)
  } else if (order.status == status.SOLD || order.status == status.CANCELLED) {
    return clearNFTBreedingOrderProperties(nft)
  } else {
    return nft
  }
}

export function addNFTBreedingOrderProperties(nft: NFT, order: BreedingOrder): NFT {
  nft.activeBreedingOrder = order.id
  nft.searchBreedingOrderStatus = order.status
  nft.searchBreedingOrderPrice = order.price
  nft.searchBreedingOrderCreatedAt = order.createdAt
  return nft
}

export function clearNFTBreedingOrderProperties(nft: NFT): NFT {
  nft.activeBreedingOrder = '';
  nft.searchBreedingOrderStatus = null
  nft.searchBreedingOrderPrice = null
  nft.searchBreedingOrderCreatedAt = null
  return nft
}

export function addNFTOrderProperties(nft: NFT, order: Order): NFT {
  nft.activeOrder = order.id
  nft.searchOrderStatus = order.status
  nft.searchOrderPrice = order.price
  nft.searchOrderPaymentToken = order.paymentToken
  nft.searchOrderCreatedAt = order.createdAt
  nft.searchOrderExpiresAt = order.expiresAt
  return nft
}

export function clearNFTOrderProperties(nft: NFT): NFT {
  nft.activeOrder = ''
  nft.searchOrderStatus = null
  nft.searchOrderPrice = null
  nft.searchOrderPaymentToken = null
  nft.searchOrderCreatedAt = null
  nft.searchOrderExpiresAt = null
  return nft
}

export function clearNFTProperties(nft: NFT): NFT {
  nft.name = ''
  nft.tokenId = null
  nft.owner = ''
  nft.searchText = ''
  nft.createdAt = null
  nft.updatedAt = null
  nft.searchKryptomonGenesGeneration = null
  nft.searchKryptomonStatus = null
  nft.searchKryptomonSpeciality = null
  nft.searchKryptomonElementPercentage = null
  nft.searchKryptomonElementType = null
  nft.searchKryptomonElementTalent = null
  nft.searchKryptomonFire = null
  nft.searchKryptomonFireTalent = null
  nft.searchKryptomonWater = null
  nft.searchKryptomonWaterTalent = null
  nft.searchKryptomonIce = null
  nft.searchKryptomonIceTalent = null
  nft.searchKryptomonGround = null
  nft.searchKryptomonGroundTalent = null
  nft.searchKryptomonAir = null
  nft.searchKryptomonAirTalent = null
  nft.searchKryptomonElectro = null
  nft.searchKryptomonElectroTalent = null
  nft.searchKryptomonGhost = null
  nft.searchKryptomonGhostTalent = null
  nft.searchKryptomonGrass = null
  nft.searchKryptomonGrassTalent = null
  nft.searchKryptomonColor = null
  nft.searchKryptomonSex = null
  nft.searchKryptomonGeneralTalent = null
  nft.searchKryptomonAttack = null
  nft.searchKryptomonDefense = null
  nft.searchKryptomonSpecial = null
  nft.searchKryptomonXFactor = null
  nft.searchKryptomonGrowthTalentFactor = null
  nft.searchKryptomonConstitution = null
  nft.searchKryptomonHealthPoints = null
  nft.searchKryptomonSpeed = null
  nft.searchKryptomonAffections = null
  nft.searchKryptomonCrazyness = null
  nft.searchKryptomonInstinct = null
  nft.searchKryptomonHunger = null
  nft.searchKryptomonLaziness = null
  nft.searchKryptomonBrave = null
  nft.searchKryptomonSmart = null
  nft.searchKryptomonBodySize = null
  nft.searchKryptomonEgo = null
  nft.searchKryptomonSkinType = null
  nft.searchKryptomonUnfreezable = null
  nft.searchIsKryptomonV2 = false;
  return nft
}

export function cancelActiveOrder(nft: NFT, now: BigInt): boolean {
  let oldOrder = Order.load(nft.activeOrder)
  if (oldOrder != null && oldOrder.status == status.OPEN) {
    // Here we are setting old orders as cancelled, because the smart contract allows new orders to be created
    // and they just overwrite them in place. But the subgraph stores all orders ever
    // you can also overwrite ones that are expired
    oldOrder.status = status.CANCELLED
    oldOrder.updatedAt = now
    oldOrder.save()

    return true
  }
  return false
}

export function cancelActiveBreedingOrder(nft: NFT, now: BigInt): boolean {
  let oldBreedingOrder = BreedingOrder.load(nft.activeBreedingOrder)
  if (oldBreedingOrder != null && oldBreedingOrder.status == status.OPEN) {
    // Here we are setting old orders as cancelled, because the smart contract allows new orders to be created
    // and they just overwrite them in place. But the subgraph stores all orders ever
    // you can also overwrite ones that are expired
    oldBreedingOrder.status = status.CANCELLED
    oldBreedingOrder.updatedAt = now
    oldBreedingOrder.save()

    return true
  }
  return false
}
