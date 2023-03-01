import { ethers, providers } from 'ethers'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { getConnectedProvider, getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { NFT } from '../nft/types'
import { BreedingOrder } from './types'

export async function addToBreedingCentre(tokenId: string, price: string) {
  const connectedProvider = await getConnectedProvider()
  if (!connectedProvider) {
    throw new Error('Provider not connected')
  }

  const kmonftV2Factory = getContract(CN.KMONFTV2, Number(getConnectedProviderChainId()))
  const provider = await new providers.Web3Provider(connectedProvider)

  const kmonftV2 = new ethers.Contract(kmonftV2Factory.address, kmonftV2Factory.abi, provider.getSigner())
  const tx = await kmonftV2.addToBreedingCentre(tokenId, price)
  const txReceipt = await tx.wait()

  // console.log(txReceipt)
}

export function getActiveBreedingOrder(nft: NFT | null, breedingOrders: Record<string, BreedingOrder>) {
  if (!!nft && !!nft.activeBreedingOrderId && nft.activeBreedingOrderId in breedingOrders) {
    return breedingOrders[nft.activeBreedingOrderId]
  }
  return null
}
