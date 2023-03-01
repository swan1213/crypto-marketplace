import { log } from '@graphprotocol/graph-ts'
import * as categories from './categories'
import * as addresses from '../../data/addresses'

export function getCategory(contractAddress: string): string {
  let category = ''

  if (contractAddress == addresses.KMONFT) {
    category = categories.KRYPTOMON
  }
  else if (contractAddress == addresses.KMONFTV2) {
    category = categories.KRYPTOMON
  }
  else {
    log.warning('Contract address {} not being monitored', [contractAddress])
    category = contractAddress
  }

  return category
}
