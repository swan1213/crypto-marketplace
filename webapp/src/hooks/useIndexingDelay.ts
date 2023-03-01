import { useEffect, useState } from 'react'
import { Eth } from 'web3x-es/eth'
import { getConnectedProvider } from '@kmon/dapps/dist/lib/eth'

import { convertTime } from '../lib/date'

export const useIndexingDelay = (subgraphBlockNumber: number | undefined, isSignedIn: boolean) => {
  const [showIndexingDelay, setShowIndexingDelay] = useState(false)
  const [indexingDelay, setIndexingDelay] = useState<string | null>(null)

  useEffect(() => {
    if (subgraphBlockNumber && isSignedIn) {
      fetchIndexingDelay()
    } else {
      setShowIndexingDelay(false)
      setIndexingDelay(null)
    }
  }, [subgraphBlockNumber, isSignedIn])
  

  const fetchIndexingDelay = async () => {
    const provider = await getConnectedProvider()
    if (!provider) {
      console.warn('Could not connect to network')
      return
    }

    const eth = new Eth(provider)
    const subgraphTimestamp = (await eth.getBlock(subgraphBlockNumber as number)).timestamp
    const currentBlockNumber = await eth.getBlockNumber()
    const currentTimestamp = (await eth.getBlock(currentBlockNumber)).timestamp
    const delay = currentTimestamp - subgraphTimestamp

    if (delay > 60) {
      setShowIndexingDelay(true)
      setIndexingDelay(convertTime(delay))
    } else {
      setShowIndexingDelay(false)
      setIndexingDelay(null)
    }
  }

  return { showIndexingDelay, indexingDelay }
}