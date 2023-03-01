import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Header } from '@kmon/ui'

import { NFTSections } from '../NFTSections'
import { Props } from './NFTSidebar.types'
import './NFTSidebar.css'

const NFTSidebar = (props: Props) => {
  const {
    section,
    onMenuItemClick,
    onMultiItemClick,
    elemTypes,
    specialties,
    supers,
    generation,
    affection,
    braveness,
    constitution,
    craziness,
    hunger,
    instinct,
    smart,
    elementStartingTalent,
    laziness,
    bodySize,
    ego,
    healthPoints,
    speed,
    sex,
    skinType,
    water,
    waterTalent,
    fire,
    fireTalent,
    ground,
    groundTalent,
    ice,
    iceTalent,
    grass,
    grassTalent,
    electro,
    electroTalent,
    ghost,
    ghostTalent,
    air,
    airTalent,
    color,
    attack,
    defence,
    generalTalent,
    growthTalentFactor,
    elementPercentage,
    special,
    price,
    priceToken,
    kryptomonStatus,
    unfreezable,
    owner
  } = props

  return (
    <div className="NFTSidebar">
      <Header sub>{t('nft_sidebar.categories')}</Header>
      <NFTSections
        section={section}
        onSectionClick={onMenuItemClick}
        onMultiItemClick={onMultiItemClick}
        elemTypes={elemTypes}
        specialties={specialties}
        supers={supers}
        generation={generation}
        affection={affection}
        braveness={braveness}
        constitution={constitution}
        craziness={craziness}
        hunger={hunger}
        instinct={instinct}
        smart={smart}
        elementStartingTalent={elementStartingTalent}
        laziness={laziness}
        bodySize={bodySize}
        ego={ego}
        speed={speed}
        healthPoints={healthPoints}
        sex={sex}
        skinType={skinType}
        water={water}
        waterTalent={waterTalent}
        fire={fire}
        fireTalent={fireTalent}
        ground={ground}
        groundTalent={groundTalent}
        ice={ice}
        iceTalent={iceTalent}
        grass={grass}
        grassTalent={grassTalent}
        electro={electro}
        electroTalent={electroTalent}
        ghost={ghost}
        ghostTalent={ghostTalent}
        air={air}
        airTalent={airTalent}
        color={color}
        attack={attack}
        defence={defence}
        generalTalent={generalTalent}
        growthTalentFactor={growthTalentFactor}
        elementPercentage={elementPercentage}
        special={special}
        price={price}
        priceToken={priceToken}
        kryptomonStatus={kryptomonStatus}
        unfreezable={unfreezable}
        owner={owner}
      />
    </div>
  )
}

export default React.memo(NFTSidebar)
