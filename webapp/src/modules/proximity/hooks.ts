import { NFTCategory } from '@kmon/schemas'
import { useMemo } from 'react'
import { NFT } from '../nft/types'
import { VendorName } from '../vendor/types'
import { Proximity } from './types'

export const useProximity = (
  nft: NFT<VendorName.DECENTRALAND>,
  proximities: Record<string, Proximity>
) =>
  useMemo(() => {
    switch (nft.category) {
      default:
        return
    }
  }, [nft, proximities])
