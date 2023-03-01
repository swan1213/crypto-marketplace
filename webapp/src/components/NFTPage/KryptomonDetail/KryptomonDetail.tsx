import React, { useState, SyntheticEvent } from 'react'
import { Container } from '@kmon/ui'
import { Dropdown } from 'semantic-ui-react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Props } from './KryptomonDetail.types'
import './KryptomonDetail.css'
import { NFTDetailCard } from '../../NFTDetailCard'
import { Elements } from '../Elements'
import { TitleBlock } from '../TitleBlock'
import { DescriptionBlock } from '../DescriptionBlock'
import { Details } from '../Details'
import { DNAChart } from '../DNAChart'
import { ElemData } from '../ElemData'
import { PriceChart } from '../PriceChart'
import { TradeHistory } from '../TradeHistory'
import Ice from '../../../images/egg/elem-ice.svg'
import Air from '../../../images/egg/elem-air.svg'
import Electro from '../../../images/egg/elem-electro.svg'
import Ghost from '../../../images/egg/elem-ghost.svg'
import Grass from '../../../images/egg/elem-grass.svg'
import Ground from '../../../images/egg/elem-ground.svg'
import Water from '../../../images/egg/elem-water.svg'
import Fire from '../../../images/egg/elem-fire.svg'
import { DNARadarChart } from '../DNARadarChart'

const KryptomonDetail = (props: Props) => {
  const { nft, order } = props
  const [isV2, setIsV2] = useState(false)
  const PRICE_DROPDOWN_VALUES = {
    DAY: t('nft_page.price_chart.day'),
    WEEK: t('nft_page.price_chart.week'),
    MONTH: t('nft_page.price_chart.month')
  }
  const [currentPriceFilter, setCurrentPriceFilter] = useState(
    PRICE_DROPDOWN_VALUES.MONTH
  )
  const toogleV2Change = () => {
    setIsV2(!isV2)
  }
  const onChangeCurrentPriceFilter = (_event: SyntheticEvent, data: any) => {
    setCurrentPriceFilter(data.text)
  }

  const PRICE_CHART = {
    [PRICE_DROPDOWN_VALUES.DAY]: {
      labels: [
        '02.09.2021',
        '03.09.2021',
        '04.09.2021',
        '05.09.2021',
        '06.09.2021',
        'Today',
        '08.09.2021'
      ],
      values: [1125, 2000, 2102, 3212, 1020, 3709]
    },
    [PRICE_DROPDOWN_VALUES.WEEK]: {
      labels: ['1st', '2nd', '3rd', '4th'],
      values: [1332, 5682, 1239, 4682]
    },
    [PRICE_DROPDOWN_VALUES.MONTH]: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Today', 'July', 'Aug'],
      values: [1625, 1332, 2322, 1239, 2223, 2578]
    }
  }
  const genes = isV2 ? nft.genesV2 : nft.data.kryptomon?.genes

  const genesArray = Object.values(genes!)
  let totalGenes = 0
  for (let i = 0; i < 16; i++) {
    totalGenes += genesArray[i] * genesArray[i + 1]
    i++
  }
  const elementTypes = [
    {
      title: t('nft_page.elements.water'),
      value: (((genes!.water * genes!.waterTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Water
    },
    {
      title: t('nft_page.elements.grass'),
      value: (((genes!.grass * genes!.grassTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Grass
    },
    {
      title: t('nft_page.elements.fire'),
      value: (((genes!.fire * genes!.fireTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Fire
    },
    {
      title: t('nft_page.elements.electro'),
      value: (
        ((genes!.electro * genes!.electroTalent) / totalGenes) *
        100
      ).toFixed(2),
      icon: Electro
    },
    {
      title: t('nft_page.elements.ground'),
      value: (
        ((genes!.ground * genes!.groundTalent) / totalGenes) *
        100
      ).toFixed(2),
      icon: Ground
    },
    {
      title: t('nft_page.elements.ghost'),
      value: (((genes!.ghost * genes!.ghostTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Ghost
    },
    {
      title: t('nft_page.elements.ice'),
      value: (((genes!.ice * genes!.iceTalent) / totalGenes) * 100).toFixed(2),
      icon: Ice
    },
    {
      title: t('nft_page.elements.air'),
      value: (((genes!.air * genes!.airTalent) / totalGenes) * 100).toFixed(2),
      icon: Air
    }
  ]

  const elementType = elementTypes.find(
    element => element.title === nft.data.kryptomon?.elementType
  )

  const maxElementType = elementTypes.reduce((prev, current) => {
    return ((prev &&
      typeof prev.value === 'string' &&
      Number.parseInt(prev.value)) ||
      0) >
      ((current &&
        typeof current.value === 'string' &&
        Number.parseInt(current.value)) ||
        0)
      ? prev
      : current
  })
  return (
    <Container className="product-container">
      <Row className="Row-space-between">
        <Column>
          <Row className="Row-space-between">
            <NFTDetailCard
              elementType={elementType}
              nft={nft}
              isV2={isV2}
              toogleV2={toogleV2Change}
            />
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.elements.title')}>
              <Elements
                elementTypes={elementTypes}
                maxElementType={maxElementType}
                nft={nft}
              />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.description')}>
              <DescriptionBlock nft={nft} />
            </TitleBlock>
            {/* <TitleBlock title={t('nft_page.trade_history.title')}>
              <TradeHistory nft={nft} />
            </TitleBlock> */}
          </Row>
        </Column>
        <Column>
          <Row className="Row-space-between">
            <Details nft={nft} order={order} />
          </Row>
          {/* <Row className="Row-space-between">
            <TitleBlock title="DNA Radar Chart">
              <DNARadarChart nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row> */}
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.dna_chart.title')}>
              {/* <DNAChart nft={nft} isV2={isV2} /> */}
              <DNARadarChart nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.metadata')}>
              <ElemData nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
        </Column>
      </Row>
    </Container>
  )
}

export default React.memo(KryptomonDetail)
