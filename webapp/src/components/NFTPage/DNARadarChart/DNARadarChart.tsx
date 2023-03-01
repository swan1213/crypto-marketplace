import React, { useEffect, useState } from 'react'
import { Radar } from 'react-chartjs-2'

import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'

import Star from '../../../images/egg/star.svg'
import { Props } from './DNARadarChart.types'
import './DNARadarChart.css'

const DNARadarChart = (props: Props) => {
  const { nft, isV2 } = props
  const genesV2Values = [
    nft.genesV2?.constitution,
    nft.genesV2?.affections,
    nft.genesV2?.crazyness,
    nft.genesV2?.instinct,
    nft.genesV2?.hunger,
    nft.genesV2?.laziness,
    nft.genesV2?.brave,
    nft.genesV2?.smart
  ]

  const DNAParams = nft.metadata.attributes?.filter(elem =>
    DNA_CONSTANTS.includes(elem.trait_type)
  )
  const sortedDNAParams = DNA_CONSTANTS.map(title => {
    return DNAParams?.find(elem => {
      return elem.trait_type === title
    })
  })

  const DNALabels = sortedDNAParams?.map(elem => {
    return elem?.trait_type
  })
  const DNAValues = isV2
    ? genesV2Values
    : sortedDNAParams?.map(elem => {
      return elem?.value
    })

  const DNAGeneration = nft.data.kryptomon?.genes.generation
  const isDNAUnfreezable = nft.data.kryptomon?.extraData.unfreezable

  const isV2New = nft.contractAddress.toUpperCase() == '0x04b0f7d5cb2ce4688497f2525748fb7a9affa394'.toUpperCase() || nft.contractAddress.toUpperCase() == '0x5eA74A7105f9c2628AbE80D3Af22Afb1d7CE9A46'.toUpperCase();
  /*
  const data = {
    labels: ['Constitution', 'Affections', 'Crazyness', 'Instinct', 'Hunger', 'Laziness', 'Brave', 'Smart'],
    datasets: [
      {
        label: 'V2',
        data: [6, 7, 5, 5, 5, 4, 9, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'V1',
        data: [6, 10, 5, 5, 1, 9, 9, 4],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
    ],
  } */
  const data = {
    labels: DNALabels,
    datasets: [
      {
        label: isV2New ? 'V2' : isV2 ? 'V2' : 'V1',
        data: DNAValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }

  const options = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 10
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }

  return (
    <div className="dna-radar-container">
      <div className="dna-info">
        <div className="dna-info-generation">Generation: {DNAGeneration}</div>
        {isDNAUnfreezable && (
          <img src={Star} alt="star-icon" className="dna-info-start" />
        )}
      </div>
      <Radar className="dna-chart" data={data} options={options} />
    </div>
  )
}

export default React.memo(DNARadarChart)
