import React, { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { Button } from '@kmon/ui'
import { Radar } from 'react-chartjs-2'
import { fromWei } from 'web3x-es/utils'

import { Props } from './Fee.types'
import './Fee.css'
import { DNA_CONSTANTS } from '../../../../modules/nft/constants'

const Fee = (props: Props) => {
  const { myNFT, selectedNFT, isBreeding, breedingPrice, selectedBreedingOrder, onBreed, onCancel } = props
  const [totalBreedingPrice, setTotalBreedingPrice] = useState<string | null>(null)

  useEffect(() => {
    if (breedingPrice && selectedBreedingOrder) {
      if (myNFT.owner === selectedNFT.owner) {
        setTotalBreedingPrice(BigNumber.from(breedingPrice).toString())
      } else {
        setTotalBreedingPrice(BigNumber.from(breedingPrice).add(BigNumber.from(selectedBreedingOrder.price)).toString())
      }
    } else {
      setTotalBreedingPrice(null)
    }
  }, [breedingPrice, selectedBreedingOrder])

  const myNFTData = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: [
          myNFT.data.kryptomon?.genes.attack,
          myNFT.data.kryptomon?.genes.defense,
          myNFT.data.kryptomon?.genes.speed,
          myNFT.data.kryptomon?.genes.ego,
          myNFT.data.kryptomon?.genes.healthPoints,
          myNFT.data.kryptomon?.genes.constitution,
          myNFT.data.kryptomon?.genes.affections,
          myNFT.data.kryptomon?.genes.crazyness,
          myNFT.data.kryptomon?.genes.instinct,
          myNFT.data.kryptomon?.genes.hunger,
          myNFT.data.kryptomon?.genes.brave,
          myNFT.data.kryptomon?.genes.smart
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }

  const myNFTOptions = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 25
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    }
  }

  const selectedNFTData = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: '',
        data: [
          selectedNFT.data.kryptomon?.genes.attack,
          selectedNFT.data.kryptomon?.genes.defense,
          selectedNFT.data.kryptomon?.genes.speed,
          selectedNFT.data.kryptomon?.genes.ego,
          selectedNFT.data.kryptomon?.genes.healthPoints,
          selectedNFT.data.kryptomon?.genes.constitution,
          selectedNFT.data.kryptomon?.genes.affections,
          selectedNFT.data.kryptomon?.genes.crazyness,
          selectedNFT.data.kryptomon?.genes.instinct,
          selectedNFT.data.kryptomon?.genes.hunger,
          selectedNFT.data.kryptomon?.genes.brave,
          selectedNFT.data.kryptomon?.genes.smart
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }
    ]
  }

  const selectedNFTOptions = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 25
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    }
  }

  const classes = ['kryptomon', 'breeding-modal-fee']
  return (
    <div className={classes.join(" ")}>
      <div className="my-kryptomon">
        <Radar data={myNFTData} options={myNFTOptions} />
      </div>
      <div className="fee-detail">
        <div className="fee-detail-info">
          Breeding Fee: {breedingPrice ? fromWei(breedingPrice, 'ether') : ''} KMON<br />
          Total Cost: {totalBreedingPrice ? fromWei(totalBreedingPrice, 'ether') : ''} KMON
        </div>
        <Button primary className="breed-button" onClick={onBreed} loading={isBreeding} disabled={isBreeding}>BREED</Button>
        <Button onClick={onCancel}>CANCEL</Button>
      </div>
      <div className="selected-kryptomon">
        <Radar data={selectedNFTData} options={selectedNFTOptions} />
      </div>
    </div>
  )
}

export default React.memo(Fee)
