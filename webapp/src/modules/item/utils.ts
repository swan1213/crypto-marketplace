import { Address } from 'web3x-es/address'
import { BigNumber } from 'ethers'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { ContractFactory } from '../contract/ContractFactory'
import { Item } from '../../contracts/Item'
import { sendTransaction } from '../wallet/utils'
import { ItemVersion } from './types'

export async function fetchItems() {
  const itemFactory = getContract(CN.Item, Number(getConnectedProviderChainId()))
  const item = await ContractFactory.build(Item, itemFactory.address)
  return item.methods.getItems().call()
}

export async function fetchItemsWithCandies() {
  const itemFactory = getContract(CN.Item, Number(getConnectedProviderChainId()))
  const item = await ContractFactory.build(Item, itemFactory.address)
  return item.methods.getItemCandies().call()
}

export async function fetchItem(itemId: string) {
  const itemFactory = getContract(CN.Item, Number(getConnectedProviderChainId()))
  const item = await ContractFactory.build(Item, itemFactory.address)
  return item.methods.nameToItem(itemId).call()
}

export async function fetchItemWithCandies(itemId: string) {
  const itemFactory = getContract(CN.Item, Number(getConnectedProviderChainId()))
  const item = await ContractFactory.build(Item, itemFactory.address)
  return item.methods.nameToItemCandy(itemId).call()
}

export async function buyItem(wallet: Wallet | null, version: ItemVersion, itemId: string, count: number, to: Address) {
  const itemFactory = getContract(CN.Item, Number(getConnectedProviderChainId()))
  const item = await ContractFactory.build(Item, itemFactory.address)

  if (!wallet) {
    throw new Error('Invalid address. Wallet must be connected.')
  }

  const from = Address.fromString(wallet.address)

  let buyItem
  if (version === ItemVersion.V1) {
    ;(buyItem = item.methods.buyLootbox(to, itemId))
  } else if (version === ItemVersion.V2) {
    ;(buyItem = item.methods.buyItem(to, itemId, count))
  }

  if (buyItem === undefined) return
  return sendTransaction(buyItem, itemFactory, from)
}

export async function buyItemWithCandies(wallet: Wallet | null, itemId: string, price: string, count: number, to: Address) {
  const itemFactory = getContract(CN.Item, Number(getConnectedProviderChainId()))
  const item = await ContractFactory.build(Item, itemFactory.address)

  if (!wallet) {
    throw new Error('Invalid address. Wallet must be connected.')
  }

  const candiesInWei = BigNumber.from(price).mul(BigNumber.from(count)).toString()

  const from = Address.fromString(wallet.address)
  const buyItem = item.methods.buyItemWithCandies(to, itemId, count, candiesInWei)

  return sendTransaction(buyItem, itemFactory, from)
}
