import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { getId } from '../nft/parcel/utils'
import { NFT } from '../nft/types'
import { Proximity } from './types'

export const getDistanceText = (distance: number) =>
  distance === 0
    ? t('proximity.adjacent')
    : t('proximity.distance', { distance })

