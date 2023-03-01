import React from 'react'
import { Props } from './ElemData.types'
import './ElemData.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'

const ElemData = (props: Props) => {
  const { nft, isV2 } = props
  const data = isV2 ? nft.genesV2 : nft.data.kryptomon?.genes
  const timeBorn = nft.data.kryptomon?.timeBorn
  const date = new Date(1970, 0, 1)
  date.setSeconds(timeBorn || 0)
  const [formatedDate] = date
    .toISOString()
    .split('-')
    .join('-')
    .split('T')
  const birthDateInFormat = formatedDate
    .split('-')
    .reverse()
    .join('-')

  const age = new Date(Date.now() - timeBorn! * 1000).getMonth()
  const lastEvolvedTime = nft.data.kryptomon?.lastEvolved != null ? nft.data.kryptomon?.lastEvolved : nft.data.kryptomon?.timeHatched;
  const lastEvolved = new Date(lastEvolvedTime! * 1000).toLocaleDateString();
  const lastEvolvedTitle = nft.data.kryptomon?.status == "1" ? 'Hatched' : parseInt(nft.data.kryptomon!.status) > 1 ? 'Last Evolved' : undefined

  const whatTheSex = (value?: string | number) => {
    if (value && +value > 5) return 'Male'
    else return 'Female'
  }
  const skinTypeToString: Record<string, string> = {
    '0': 'Feather',
    '1': 'Skin',
    '2': 'Scale',
    '3': 'Short hairs',
    '4': 'Long hairs'
  }
  const arr = [
    { title: 'Water talent', value: data?.waterTalent },
    { title: 'Fire talent', value: data?.fireTalent },
    { title: 'Ground talent', value: data?.groundTalent },
    { title: 'Ice talent', value: data?.iceTalent },
    { title: 'Grass talent', value: data?.grassTalent },
    { title: 'Electro talent', value: data?.electroTalent },
    { title: 'Ghost talent', value: data?.ghostTalent },
    { title: 'Air talent', value: data?.airTalent },
    { title: 'Body size', value: data?.bodySize },
    { title: 'Attack', value: data?.attack },
    { title: 'Defence', value: data?.defense },
    { title: 'Ego', value: data?.ego },
    { title: 'General talent', value: data?.generalTalent },
    { title: 'xFactor', value: data?.xFactor },
    { title: 'Growth talent factor', value: data?.growthTalentFactor },
    { title: 'Health points', value: data?.healthPoints },
    { title: 'Sex', value: whatTheSex(data?.sex) },
    { title: 'Skin type', value: skinTypeToString[data?.skinType || 0] },
    { title: 'Special', value: data?.special },
    { title: 'Speed', value: data?.speed },
    { title: 'Age(months)', value: age },
  ]

  if (lastEvolvedTitle) {
    arr.push({ title: lastEvolvedTitle, value: lastEvolved });
  }

  return (
    <div className="elems-container">
      {arr.map(({ title, value }) => {
        return (
          <div key={title} className="elem-row">
            <div className="elem-row-text">{title}:</div>
            <div className="elem-row-value">{value}</div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(ElemData)
