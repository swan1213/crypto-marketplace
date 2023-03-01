import { ChainId, Network } from '@kmon/schemas'
import {
  Contract,
  ContractService as ContractServiceInterface
} from '../services'
import { Network as AppNetwork } from '../../contract/types'
import { TransferType } from '../types'

const network = process.env.REACT_APP_NETWORK! as AppNetwork

export enum ContractName {
  DIGITAL_ASSET = 'DigitalAssset',
  MARKETPLACE_ADAPTER = 'MarketplaceAdapter'
}

const contracts = ({
  [AppNetwork.RINKEBY]: [],
  [AppNetwork.BSC_MAINNET]: [],
  [AppNetwork.BSC_TESTNET]: [],
} as Record<AppNetwork, Contract[]>)[network]

export class ContractService implements ContractServiceInterface {
  contracts = []

  async build() { }

  getContracts() {
    return this.contracts
  }

  getTransferType(_address: string) {
    return TransferType.SAFE_TRANSFER_FROM
  }
}
