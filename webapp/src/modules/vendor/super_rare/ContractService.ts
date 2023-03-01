import { ChainId, Network } from '@kmon/schemas'
import { Network as AppNetwork } from '../../contract/types'
import { getContract } from '../../contract/utils'
import {
  Contract,
  ContractService as ContractServiceInterface
} from '../services'
import { TransferType } from '../types'

const network = process.env.REACT_APP_NETWORK! as AppNetwork

export enum ContractName {
  SUPER_RARE = 'SuperRare',
  SUPER_RARE_V2 = 'SuperRareV2',
  SUPER_RARE_MARKET = 'SuperRareMarket',
  SUPER_RARE_MARKET_V2 = 'SuperRareMarketV2',
  MARKETPLACE_ADAPTER = 'MarketplaceAdapter'
}

const contracts = ({
  [AppNetwork.RINKEBY]: [
    {
      name: ContractName.MARKETPLACE_ADAPTER,
      address: '0xd1e4e2880ff56cd0d5c68da9bed58bfbf0150948',
      vendor: 'super_rare',
      category: null,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_RINKEBY
    }
  ],
  [AppNetwork.BSC_MAINNET]: [],
  [AppNetwork.BSC_TESTNET]: []
} as Record<AppNetwork, Contract[]>)[network]

export class ContractService implements ContractServiceInterface {
  contracts = []

  async build() { }

  getContracts() {
    return this.contracts
  }

  getTransferType(address: string) {
    const contract = getContract({ address })
    if (!contract) {
      throw new Error('Invalid address: not found in contracts')
    }
    switch (contract.name) {
      case ContractName.SUPER_RARE:
        return TransferType.TRANSFER
      case ContractName.SUPER_RARE_V2:
        return TransferType.SAFE_TRANSFER_FROM
      default:
        throw new Error(
          `Invalid contract name: expected "${ContractName.SUPER_RARE}" or "${ContractName.SUPER_RARE_V2}" but got "${contract.name}" instead`
        )
    }
  }
}
