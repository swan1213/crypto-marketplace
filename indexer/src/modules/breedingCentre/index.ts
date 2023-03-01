import { NFT, Order, BreedingCentre } from '../../entities/schema'
import * as categories from '../category/categories'
import * as addresses from '../../data/addresses'
import { BigInt } from '@graphprotocol/graph-ts'

export const DEFAULT_ID = 'all'

export function buildBreedingCentre(): BreedingCentre {
  let breedingCentre = BreedingCentre.load(DEFAULT_ID)

  if (breedingCentre == null) {
    breedingCentre = new BreedingCentre(DEFAULT_ID)
    breedingCentre.breedingFee = BigInt.fromString('0');
    breedingCentre.kryptomonTotal = 0;
  }

  return breedingCentre as BreedingCentre
}

export function setBreedingCentreFee(price: BigInt): BreedingCentre {
  let breedingCentre = buildBreedingCentre()

  breedingCentre.breedingFee = price

  return breedingCentre
}

export function addOrderToBreedingCentre(): BreedingCentre {
  let breedingCentre = buildBreedingCentre()
  breedingCentre.kryptomonTotal += 1

  return breedingCentre
}

export function removeOrderToBreedingCentre(): BreedingCentre {
  let breedingCentre = buildBreedingCentre()
  breedingCentre.kryptomonTotal -= 1

  return breedingCentre
}
