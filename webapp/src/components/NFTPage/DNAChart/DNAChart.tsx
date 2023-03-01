import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Props } from './DNAChart.types'
import './DNAChart.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'

const DNAChart = (props: Props) => {
  const { nft, isV2 } = props
  const genesV2Values = [
    nft.genesV2?.attack,
    nft.genesV2?.defense,
    nft.genesV2?.speed,
    nft.genesV2?.ego,
    nft.genesV2?.healthPoints,
    nft.genesV2?.constitution,
    nft.genesV2?.affections,
    nft.genesV2?.crazyness,
    nft.genesV2?.instinct,
    nft.genesV2?.hunger,
    nft.genesV2?.brave,
    nft.genesV2?.smart
  ]

  const genesValues = [
    nft.data.kryptomon!.genes.attack,
    nft.data.kryptomon!.genes.defense,
    nft.data.kryptomon!.genes.speed,
    nft.data.kryptomon!.genes.ego,
    nft.data.kryptomon!.genes.healthPoints,
    nft.data.kryptomon!.genes.constitution,
    nft.data.kryptomon!.genes.affections,
    nft.data.kryptomon!.genes.crazyness,
    nft.data.kryptomon!.genes.instinct,
    nft.data.kryptomon!.genes.hunger,
    nft.data.kryptomon!.genes.brave,
    nft.data.kryptomon!.genes.smart
  ]

  const DNAValues = isV2
    ? genesV2Values
    : genesValues

  const DNAGeneration = nft.data.kryptomon?.genes.generation
  const isDNAUnfreezable = nft.data.kryptomon?.extraData.unfreezable

  const data = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        data: DNAValues,
        backgroundColor: DNA_COLORS,
        borderSkipped: false,
        borderRadius: 5,
        width: 678,
        barPercentage: 0.65,
        categoryPercentage: 0.5,
        fill: 10,
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
          weight: 'bold',
          family: 'PT Mono'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          maxRotation: -90,
          minRotation: -90,
          padding: -10,
          labelOffset: 25,
          color: '#676370',
          align: 'start',
          font: {
            size: isMobile() ? 0 : 13,
            family: 'PT Mono'
          }
        },
        legend: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          beginAtZero: true,
          min: 0,
          max: 100,
          precision: 0,
          stepSize: 25,
          callback: (value: number) => {
            return value + '%'
          },
          color: '#676370',
          font: {
            size: 10,
            family: 'PT-Mono'
          }
        }
      }
    }
  }

  const [screen, setScreen] = useState(0);

  useEffect(() => {
    window.innerWidth > 1201 || window.innerWidth < 768 ? setScreen(0) : setScreen(1);
    function handleResize() {
      window.innerWidth > 1201 || window.innerWidth < 768 ? setScreen(0) : setScreen(1);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  return (
    <div className="dna-container">
      <div className="dna-info">
        <div className="dna-info-generation">Generation: {DNAGeneration}</div>
        {isDNAUnfreezable && (
          <img src={Star} alt="star-icon" className="dna-info-start" />
        )}
      </div>
      <Bar
        className="dna-chart"
        width={screen == 0 ? 678 : 400}
        height={isMobile() ? 400 : 210}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}

export default React.memo(DNAChart)
