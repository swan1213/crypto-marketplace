import { ethers, providers, BigNumber } from 'ethers'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { getConnectedProvider, getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { GenesV2 } from './types'
import { NFT } from '../nft/types'

export async function simulateBreeding(matronId: string, sireId: string): Promise<GenesV2> {
  const connectedProvider = await getConnectedProvider()
  if (!connectedProvider) {
    throw new Error('Provider not connected')
  }

  const kmonftV2Factory = getContract(CN.KMONFTV2, Number(getConnectedProviderChainId()))
  const provider = await new providers.Web3Provider(connectedProvider)

  const kmonftV2 = new ethers.Contract(kmonftV2Factory.address, kmonftV2Factory.abi, provider.getSigner())
  let genes: GenesV2 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ]
  try {
    const result = (await kmonftV2.simulateBreeding(matronId, sireId)) as BigNumber[]
    genes[0] = result[0].toNumber()
    genes[1] = result[1].toNumber()
    genes[2] = result[2].toNumber()
    genes[3] = result[3].toNumber()
    genes[4] = result[4].toNumber()
    genes[5] = result[5].toNumber()
    genes[6] = result[6].toNumber()
    genes[7] = result[7].toNumber()
    genes[8] = result[8].toNumber()
    genes[9] = result[9].toNumber()
    genes[10] = result[10].toNumber()
    genes[11] = result[11].toNumber()
    genes[12] = result[12].toNumber()
    genes[13] = result[13].toNumber()
    genes[14] = result[14].toNumber()
    genes[15] = result[15].toNumber()
    genes[16] = result[16].toNumber()
    genes[17] = result[17].toNumber()
    genes[18] = result[18].toNumber()
    genes[19] = result[19].toNumber()
    genes[20] = result[20].toNumber()
    genes[21] = result[21].toNumber()
    genes[22] = result[22].toNumber()
    genes[23] = result[23].toNumber()
    genes[24] = result[24].toNumber()
    genes[25] = result[25].toNumber()
    genes[26] = result[26].toNumber()
    genes[27] = result[27].toNumber()
    genes[28] = result[28].toNumber()
    genes[29] = result[29].toNumber()
    genes[30] = result[30].toNumber()
    genes[31] = result[31].toNumber()
    genes[32] = result[32].toNumber()
    genes[33] = result[33].toNumber()
    genes[34] = result[34].toNumber()
    genes[35] = result[35].toNumber()
    genes[36] = result[36].toNumber()
    genes[37] = result[37].toNumber()
  } catch (e) { }
  return genes
}

export async function breed(femaleTokenId: string, maleTokenId: string) {
  const connectedProvider = await getConnectedProvider()
  if (!connectedProvider) {
    throw new Error('Provider not connected')
  }

  const kmonftV2Factory = getContract(CN.KMONFTV2, Number(getConnectedProviderChainId()))
  const provider = await new providers.Web3Provider(connectedProvider)

  const kmonftV2 = new ethers.Contract(kmonftV2Factory.address, kmonftV2Factory.abi, provider.getSigner())
  const tx = await kmonftV2.breedKryptomons(femaleTokenId, maleTokenId)
  const txReceipt = await tx.wait()

  // forward to the dashboard
  window.location.href = "https://app.kryptomon.co/eggsV2";

  console.log(txReceipt)
}

export async function cancelBreed(tokenId: string) {
  const connectedProvider = await getConnectedProvider()
  if (!connectedProvider) {
    throw new Error('Provider not connected')
  }

  const kmonftV2Factory = getContract(CN.KMONFTV2, Number(getConnectedProviderChainId()))
  const provider = await new providers.Web3Provider(connectedProvider)

  const kmonftV2 = new ethers.Contract(kmonftV2Factory.address, kmonftV2Factory.abi, provider.getSigner())
  const tx = await kmonftV2.removeFromBreedingCentre(tokenId)
  const txReceipt = await tx.wait()

  console.log(txReceipt)
}

export function calcMutationFactor(myNFT: NFT | null, selectedNFT: NFT | null) {
  if (myNFT && selectedNFT) {
    const myGen = myNFT.data.kryptomon?.genes.generation
    const selectedGen = selectedNFT.data.kryptomon?.genes.generation
    if (myGen && selectedGen) {
      const gen = Math.min(Number(myGen), Number(selectedGen))
      return (2.0 / (1 + Math.pow(2.78, -0.033 * gen)) - 1) * 100;
    }
    return null
  }

  return null
}

export function calcBreedingPrice(myNFT: NFT | null, selectedNFT: NFT | null, breedingFee: string | null) {
  if (myNFT && selectedNFT && breedingFee) {
    if (myNFT.data.kryptomon?.genes !== undefined && selectedNFT.data.kryptomon?.genes !== undefined &&
      (myNFT.data.kryptomon?.genes.sex > 5 && selectedNFT.data.kryptomon?.genes.sex <= 5 || myNFT.data.kryptomon?.genes.sex <= 5 && selectedNFT.data.kryptomon?.genes.sex > 5)) {
      const breedingCount = Number(myNFT.data.kryptomon.breedingCount) + Number(selectedNFT.data.kryptomon.breedingCount)
      return BigNumber.from(breedingFee).mul(BigNumber.from(breedingCount)).div(BigNumber.from(10)).add(BigNumber.from(breedingFee)).toString()
    }
    return null
  }

  return null
}
