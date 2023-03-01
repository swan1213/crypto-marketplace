import React, { useMemo } from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Row } from '@kmon/ui'
import { ArrayFilter } from '../ArrayFilter'
import { SelectFilter } from '../SelectFilter'
import { Props } from './FiltersMenu.types'
import { Network, Rarity } from '@kmon/schemas'
import { contracts } from '../../../../modules/contract/utils'

export const ALL_FILTER_OPTION = 'ALL'

const FiltersMenu = (props: Props) => {
  const {
    selectedCollection,
    selectedRarities,
    selectedNetwork,
    onCollectionsChange,
    onRaritiesChange,
    onNetworkChange
  } = props

  const collectionOptions = useMemo(() => {
    return [
      {
        value: ALL_FILTER_OPTION,
        text: t('nft_filters.all_collections')
      },
      ...contracts
        .filter(contract => contract.category === 'wearable')
        .map(contract => ({
          value: contract.address,
          text: contract.name
        }))
    ]
  }, [])

  const rarityOptions = useMemo(() => {
    const options = Object.values(Rarity)
      .filter(value => typeof value === 'string')
      .reverse() as string[]
    return options.map(rarity => ({
      value: rarity,
      text: t(`wearable.rarity.${rarity}`)
    }))
  }, [])

  const networkOptions = useMemo(() => {
    const options = Object.values(Network).filter(
      value => typeof value === 'string'
    ) as Network[]
    return [
      {
        value: ALL_FILTER_OPTION,
        text: t('nft_filters.all_networks')
      },
      ...options.map(network => ({
        value: network,
        text: t(`networks.${network.toLowerCase()}`)
      }))
    ]
  }, [])

  return (
    <>
      <Row>
        <SelectFilter
          name={t('nft_filters.collection')}
          value={selectedCollection || ALL_FILTER_OPTION}
          options={collectionOptions}
          onChange={onCollectionsChange}
        />
        <SelectFilter
          name={t('nft_filters.network')}
          value={selectedNetwork || ALL_FILTER_OPTION}
          options={networkOptions}
          onChange={network => onNetworkChange(network as Network)}
        />
      </Row>
      <Row>
        <ArrayFilter
          name={t('nft_filters.rarity')}
          values={selectedRarities}
          options={rarityOptions}
          onChange={onRaritiesChange}
        />
      </Row>
    </>
  )
}

FiltersMenu.defaultValues = {
  selectedRarities: [],
  selectedGenders: []
}

export default React.memo(FiltersMenu)
