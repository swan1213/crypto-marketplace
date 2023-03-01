import { SendOptions, TxSend } from 'web3x-es/contract'
import { Address } from 'web3x-es/address'
import { Network } from '@kmon/schemas'
import { getChainConfiguration } from '@kmon/dapps/dist/lib/chainConfiguration'
import {
  ContractData,
  sendMetaTransaction as baseSendMetaTransaction
} from '@kmon/transactions'
import {
  getConnectedProvider,
  getNetworkProvider
} from '@kmon/dapps/dist/lib/eth'

export const TRANSACTIONS_API_URL = process.env.REACT_APP_TRANSACTIONS_API_URL

export function shortenAddress(address: string) {
  if (address) {
    return address.slice(0, 6) + '...' + address.slice(42 - 5)
  }
}

export function addressEquals(address1?: string, address2?: string) {
  return (
    address1 !== undefined &&
    address2 !== undefined &&
    address1.toLowerCase() === address2.toLowerCase()
  )
}

export function sendTransaction(
  method: TxSend<any>,
  contract: ContractData,
  from: Address,
  value?: number
): Promise<string> {
  const { network } = getChainConfiguration(contract.chainId)
  const msg: SendOptions = { from }
  if (value !== undefined) {
    msg.value = value
  }

  switch (network) {
    case Network.ETHEREUM:
    case Network.BSC:
      return method.send(msg).getTxHash()
    default:
      throw new Error(`Undefined network ${network}`)
  }
}

export async function sendMetaTransaction(
  method: TxSend<any>,
  contract: ContractData,
  from: Address
): Promise<string> {
  const provider = await getConnectedProvider()
  if (!provider) {
    throw new Error('Could not get a valid connected Wallet')
  }
  const metaTxProvider = await getNetworkProvider(contract.chainId)
  const txData = getMethodData(method, from)
  return baseSendMetaTransaction(provider, metaTxProvider, txData, contract, {
    serverURL: TRANSACTIONS_API_URL
  })
}

export function getMethodData(method: TxSend<any>, from: Address): string {
  const payload = method.getSendRequestPayload({ from })
  return payload.params[0].data
}
