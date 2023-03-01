import React from 'react'
import { Radar } from 'react-chartjs-2'

import { Props } from './Probability.types'
import './Probability.css'
import { DNA_CONSTANTS } from '../../../../modules/nft/constants'

const Probability = (props: Props) => {
  const { myNFT, selectedNFT, simulatedGenes, mutationFactor } = props

  const parLimits = {
    'attack': { 'max': 100, 'min': 25 },
    'defense': { 'max': 100, 'min': 25 },
    'crazyness': { 'max': 100, 'min': 35 },
    'constitution': { 'max': 100, 'min': 35 },
    'healthPoints': { 'max': 100, 'min': 25 },
    'instinct': { 'max': 100, 'min': 35 },
    'speed': { 'max': 100, 'min': 25 },
    'color': { 'max': 10000, 'min': 0 },
    'sex': { 'max': 10, 'min': 1 },
    'special': { 'max': 10, 'min': 1 },
    'generalTalent': { 'max': 100, 'min': 0 },
    'growthTalentFactor': { 'max': 100, 'min': 0 },
    'affections': { 'max': 100, 'min': 20 },
    'ego': { 'max': 100, 'min': 20 },
    'hunger': { 'max': 100, 'min': 20 },
    'laziness': { 'max': 100, 'min': 0 },
    'smart': { 'max': 100, 'min': 0 },
    'brave': { 'max': 100, 'min': 0 },
    'bodySize': { 'max': 100, 'min': 0 },
    'skinType': { 'max': 4, 'min': 0 },
    'element': { 'max': 100, 'min': 0 }
  }

  const mutation = mutationFactor! / 100;
  const getBreedingRange = (parent1Gen: number, parent2Gen: number, parMin: number, parMax: number) => {
    const minGenome = Math.min(parent1Gen, parent2Gen);
    const min = Math.max(minGenome * (1 - mutation), parMin);
    const maxGenome = Math.max(parent1Gen, parent2Gen);
    const max = Math.min(Math.max(maxGenome * (1 + mutation), maxGenome + 5), parMax);
    return {
      min,
      max
    }
  }

  const genomeRanges: any = Object.fromEntries(DNA_CONSTANTS.map((gen) => {
    gen = gen.toLowerCase();
    const arr = gen.split(" ");
    for (var i = 0; i < arr.length; i++) {
      if (i > 0)
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    gen = arr.join("");
    //@ts-ignore
    const range = getBreedingRange(myNFT.data.kryptomon!.genes[gen], selectedNFT.data.kryptomon!.genes[gen], parLimits[gen].min, parLimits[gen].max);
    return [gen, range];
  }));

  const lowerRange = [
    genomeRanges.attack.min,
    genomeRanges.defense.min,
    genomeRanges.speed.min,
    genomeRanges.ego.min,
    genomeRanges.healthPoints.min,
    genomeRanges.constitution.min,
    genomeRanges.affections.min,
    genomeRanges.crazyness.min,
    genomeRanges.instinct.min,
    genomeRanges.hunger.min,
    genomeRanges.brave.min,
    genomeRanges.smart.min
  ]

  const higherRange = [
    genomeRanges.attack.max,
    genomeRanges.defense.max,
    genomeRanges.speed.max,
    genomeRanges.ego.max,
    genomeRanges.healthPoints.max,
    genomeRanges.constitution.max,
    genomeRanges.affections.max,
    genomeRanges.crazyness.max,
    genomeRanges.instinct.max,
    genomeRanges.hunger.max,
    genomeRanges.brave.max,
    genomeRanges.smart.max
  ]

  const data = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: myNFT.metadata.name,
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
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        fill: false,
        borderWidth: 1.5
      },
      {
        label: selectedNFT.metadata.name,
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
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        fill: false,
        borderWidth: 1.5
      },
      {
        label: 'Simulated',
        data: simulatedGenes,
        backgroundColor: 'rgba(217, 225, 160, 0.2)',
        borderColor: 'rgb(217, 225, 160)',
        pointBackgroundColor: 'rgb(217, 225, 160)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(217, 225, 160)',
        fill: false,
        borderDash: [5]
      },
      {
        label: 'Lower Limit',
        data: lowerRange,
        fill: "+1",
        backgroundColor: 'rgba(217, 225, 160, 0.2)',
        borderColor: 'rgb(217, 225, 160)',
        pointBackgroundColor: 'rgb(217, 225, 160)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(217, 225, 160)',
        borderWidth: 0
      },
      {
        label: 'Higher Limit',
        data: higherRange,
        backgroundColor: 'rgba(217, 225, 160, 0.2)',
        borderColor: 'rgb(217, 225, 160)',
        pointBackgroundColor: 'rgb(217, 225, 160)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(217, 225, 160)',
        fill: false,
        borderWidth: 0
      }
    ]
  }

  const options = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }

  const classes = ['kryptomon', 'breeding-modal-probability']
  return (
    <div className={classes.join(" ")}>
      <div className="value">
        Mutation factor {mutationFactor !== null ? mutationFactor.toFixed(2) : ''}%
      </div>
      <div className="probability-chart-box">
        <div className="probability-chart">
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Probability)
