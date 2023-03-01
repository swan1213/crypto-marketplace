import { NFT, Kryptomon } from '../../entities/schema'
import { BigInt } from "@graphprotocol/graph-ts"

export function buildKryptomonFromNFT(nft: NFT): Kryptomon {
  let kryptomon = new Kryptomon(nft.id)

  kryptomon.tokenId = nft.tokenId
  kryptomon.owner = nft.owner
  kryptomon.isHatched = false;

  return kryptomon
}

export function getKryptomonImage(kryptomon: Kryptomon): string {
  return (
    'https://api.kryptomon.co/json/kryptomon/meta/' +
    kryptomon.tokenId.toString()
  )
}

export function getKryptomonTokenURI(kryptomon: Kryptomon): string {
  return (
    'https://api.kryptomon.co/json/kryptomon/meta/' +
    kryptomon.tokenId.toString()
  )
}

export const typeFormatted: string[] = [
  "Fire",
  "Water",
  "Ice",
  "Ground",
  "Air",
  "Electro",
  "Ghost",
  "Grass",
]

export class ElementData {
  typeName: string
  valueName: BigInt
  percentage: BigInt
}