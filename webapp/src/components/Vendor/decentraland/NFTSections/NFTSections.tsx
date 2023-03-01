import React, { useState, useEffect } from 'react'

import { Section } from '../../../../modules/vendor/decentraland/routing/types'
import { Menu } from '../../../Menu'
import { MenuItem } from '../../../Menu/MenuItem'
import { MultiRangeSlider } from '../../../Menu/MultiRangeSlider'
import { Dropdown } from '../../../Menu/Dropdown'
import { Checkbox, CheckboxContainer } from '../../../Checkbox'
import {
  ELEM_TYPE,
  SPECIALTIES,
  SUPERS,
  SKIN_TYPES,
  SEXES,
  PRICE_TOKENS,
  STATUSES,
  UNFREEZABLE
} from './NFTSection.data'
import { Props } from './NFTSections.types'
import './NFTSections.style.css'
import { RadioRange } from '../../../Menu/RadioRange'
import { Button } from 'semantic-ui-react'

const NFTSections = (props: Props) => {
  const {
    section,
    onSectionClick,
    onMultiItemClick,
    elemTypes = [],
    specialties = [],
    supers = [],
    generation = [],
    affection = [],
    braveness = [],
    constitution = [],
    craziness = [],
    hunger = [],
    instinct = [],
    smart = [],
    elementStartingTalent = [],
    laziness = [],
    bodySize = [],
    ego = [],
    healthPoints = [],
    speed = [],
    sex = [],
    skinType = [],
    water = [],
    waterTalent = [],
    fire = [],
    fireTalent = [],
    ground = [],
    groundTalent = [],
    ice = [],
    iceTalent = [],
    grass = [],
    grassTalent = [],
    electro = [],
    electroTalent = [],
    ghost = [],
    ghostTalent = [],
    air = [],
    airTalent = [],
    color = [],
    attack = [],
    defence = [],
    generalTalent = [],
    growthTalentFactor = [],
    elementPercentage = [],
    special = [],
    price = [],
    priceToken = [],
    kryptomonStatus = [],
    unfreezable = [],
    owner = undefined
  } = props
  const [state, setState] = useState({
    elemTypes,
    generation,
    affection,
    specialties,
    supers,
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
  })

  useEffect(() => {
    onMultiItemClick(state)
  }, [state])

  const handleStateChange = (
    min: number,
    max: number,
    field: string,
    maxAllow = 100
  ) => {
    if (min === 0 && max === maxAllow) {
      setState({
        ...state,
        [field]: []
      })
    } else {
      setState({
        ...state,
        [field]: [min.toString(), max.toString()]
      })
    }
  }

  return (
    <Menu className="NFTSections">
      <div className="clear-filters">
        <Button
          basic
          onClick={() => {
            setState({
              elemTypes: [],
              generation: [],
              affection: [],
              specialties: [],
              supers: [],
              braveness: [],
              constitution: [],
              craziness: [],
              hunger: [],
              instinct: [],
              smart: [],
              elementStartingTalent: [],
              laziness: [],
              bodySize: [],
              ego: [],
              healthPoints: [],
              speed: [],
              sex: [],
              skinType: [],
              water: [],
              waterTalent: [],
              fire: [],
              fireTalent: [],
              ground: [],
              groundTalent: [],
              ice: [],
              iceTalent: [],
              grass: [],
              grassTalent: [],
              electro: [],
              electroTalent: [],
              ghost: [],
              ghostTalent: [],
              air: [],
              airTalent: [],
              color: [],
              attack: [],
              defence: [],
              generalTalent: [],
              growthTalentFactor: [],
              elementPercentage: [],
              special: [],
              price: [],
              priceToken: [],
              kryptomonStatus: [],
              unfreezable: [],
              owner: undefined
            })
          }}
        >
          Clear filters
        </Button>
      </div>
      {[Section.ALL].map(menuSection => (
        <MenuItem
          key={menuSection}
          value={menuSection}
          currentValue={section}
          onClick={onSectionClick}
        />
      ))}

      {[Section.LAND, Section.PARCELS, Section.ESTATES].includes(section!)
        ? [Section.PARCELS, Section.ESTATES].map(menuSection => (
            <MenuItem
              key={menuSection}
              value={menuSection}
              currentValue={section}
              onClick={onSectionClick}
              nestedLevel={1}
            />
          ))
        : null}
      <Dropdown value={Section.GENERATIONS} open={state.generation.length > 0}>
        <MultiRangeSlider
          min={0}
          max={10}
          minValue={+state.generation[0]}
          maxValue={+state.generation[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'generation')
          }}
          isInteger
        />
      </Dropdown>
      <Dropdown
        value={Section.KRYPTOMON_STATUS}
        open={state.kryptomonStatus.length > 0}
      >
        <CheckboxContainer>
          {STATUSES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.kryptomonStatus.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.kryptomonStatus.indexOf(elem) > -1) {
                  const newArr = [...state.kryptomonStatus]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, kryptomonStatus: newArr })
                } else {
                  const newArr = [...state.kryptomonStatus, elem]
                  setState({ ...state, kryptomonStatus: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.UNFREEZABLE} open={state.unfreezable.length > 0}>
        <CheckboxContainer>
          {UNFREEZABLE.map(elem => (
            <Checkbox
              key={elem}
              checked={state.unfreezable.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.unfreezable.indexOf(elem) > -1) {
                  const newArr = [...state.unfreezable]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, unfreezable: newArr })
                } else {
                  const newArr = [...state.unfreezable, elem]
                  setState({ ...state, unfreezable: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown
        value={Section.PRICE}
        open={state.price.length > 0 || state.priceToken.length > 0}
      >
        <RadioRange
          min={0}
          max={1000}
          minValue={+state.price[0]}
          maxValue={+state.price[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'price')
          }}
          radioState={state.priceToken}
          radioOptions={PRICE_TOKENS}
          onRadioChange={(elem: string) => {
            if (state.priceToken.indexOf(elem) > -1) {
              const newArr = [...state.priceToken]
              newArr.splice(newArr.indexOf(elem), 1)
              setState({ ...state, priceToken: newArr })
            } else {
              const newArr = [elem]
              setState({ ...state, priceToken: newArr })
            }
          }}
        />
      </Dropdown>
      <Dropdown value={Section.ELEMENT_TYPE} open={state.elemTypes.length > 0}>
        <CheckboxContainer>
          {ELEM_TYPE.map(elem => (
            <Checkbox
              key={elem}
              checked={state.elemTypes.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.elemTypes.indexOf(elem) > -1) {
                  const newArr = [...state.elemTypes]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, elemTypes: newArr })
                } else {
                  const newArr = [...state.elemTypes, elem]
                  setState({ ...state, elemTypes: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
        <div className="elemTypes">
          <Dropdown value={Section.WATER} open={state.water.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.water[0]}
              maxValue={+state.water[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'water')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.WATER_TALENT}
            open={state.waterTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.waterTalent[0]}
              maxValue={+state.waterTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'waterTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.FIRE} open={state.fire.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.fire[0]}
              maxValue={+state.fire[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'fire')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.FIRE_TALENT}
            open={state.fireTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.fireTalent[0]}
              maxValue={+state.fireTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'fireTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.GROUND} open={state.ground.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.ground[0]}
              maxValue={+state.ground[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'ground')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.GROUND_TALENT}
            open={state.groundTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.groundTalent[0]}
              maxValue={+state.groundTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'groundTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.ICE} open={state.ice.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.ice[0]}
              maxValue={+state.ice[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'ice')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.ICE_TALENT}
            open={state.iceTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.iceTalent[0]}
              maxValue={+state.iceTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'iceTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.GRASS} open={state.grass.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.grass[0]}
              maxValue={+state.grass[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'grass')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.GRASS_TALENT}
            open={state.grassTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.grassTalent[0]}
              maxValue={+state.grassTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'grassTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.ELECTRO} open={state.electro.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.electro[0]}
              maxValue={+state.electro[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'electro')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.ELECTRO_TALENT}
            open={state.electroTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.electroTalent[0]}
              maxValue={+state.electroTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'electroTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.GHOST} open={state.ghost.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.ghost[0]}
              maxValue={+state.ghost[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'ghost')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.GHOST_TALENT}
            open={state.ghostTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.ghostTalent[0]}
              maxValue={+state.ghostTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'ghostTalent')
              }}
            />
          </Dropdown>
          <Dropdown value={Section.AIR} open={state.air.length > 0}>
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={+state.air[0]}
              maxValue={+state.air[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'air')
              }}
            />
          </Dropdown>
          <Dropdown
            value={Section.AIR_TALENT}
            open={state.airTalent.length > 0}
          >
            <MultiRangeSlider
              min={0}
              max={10}
              minValue={+state.airTalent[0]}
              maxValue={+state.airTalent[1]}
              onChange={({ min, max }) => {
                handleStateChange(min, max, 'airTalent')
              }}
            />
          </Dropdown>
        </div>
      </Dropdown>
      <Dropdown value={Section.SPECIALTY} open={state.specialties.length > 0}>
        <CheckboxContainer>
          {SPECIALTIES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.specialties.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.specialties.indexOf(elem) > -1) {
                  const newArr = [...state.specialties]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, specialties: newArr })
                } else {
                  const newArr = [...state.specialties, elem]
                  setState({ ...state, specialties: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.SKIN_TYPE} open={state.skinType.length > 0}>
        <CheckboxContainer>
          {SKIN_TYPES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.skinType.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.skinType.indexOf(elem) > -1) {
                  const newArr = [...state.skinType]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, skinType: newArr })
                } else {
                  const newArr = [...state.skinType, elem]
                  setState({ ...state, skinType: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.SEX} open={state.sex.length > 0}>
        <CheckboxContainer>
          {SEXES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.sex.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.sex.indexOf(elem) > -1) {
                  const newArr = [...state.sex]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, sex: newArr })
                } else {
                  const newArr = [...state.sex, elem]
                  setState({ ...state, sex: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.SUPER} open={state.supers.length > 0}>
        <CheckboxContainer>
          {SUPERS.map(elem => (
            <Checkbox
              key={elem}
              checked={state.supers.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.supers.indexOf(elem) > -1) {
                  const newArr = [...state.supers]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, supers: newArr })
                } else {
                  const newArr = [...state.supers, elem]
                  setState({ ...state, supers: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.AFFECTION} open={state.affection.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.affection[0]}
          maxValue={+state.affection[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'affection')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.BRAVENESS} open={state.braveness.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.braveness[0]}
          maxValue={+state.braveness[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'braveness')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.CONSTITUTION}
        open={state.constitution.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.constitution[0]}
          maxValue={+state.constitution[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'constitution')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.CRAZINESS} open={state.craziness.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.craziness[0]}
          maxValue={+state.craziness[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'craziness')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.HUNGER} open={state.hunger.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.hunger[0]}
          maxValue={+state.hunger[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'hunger')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.INSTINCT} open={state.instinct.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.instinct[0]}
          maxValue={+state.instinct[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'instinct')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.SMART} open={state.smart.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.smart[0]}
          maxValue={+state.smart[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'smart')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.ELEMENT_STARTING_TALENT}
        open={state.elementStartingTalent.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={1000}
          minValue={+state.elementStartingTalent[0]}
          maxValue={+state.elementStartingTalent[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'elementStartingTalent', 1000)
          }}
        />
      </Dropdown>
      <Dropdown value={Section.LAZINESS} open={state.laziness.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.laziness[0]}
          maxValue={+state.laziness[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'laziness')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.BODY_SIZE} open={state.bodySize.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.bodySize[0]}
          maxValue={+state.bodySize[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'bodySize')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.EGO} open={state.ego.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.ego[0]}
          maxValue={+state.ego[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'ego')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.HEALTH_POINTS}
        open={state.healthPoints.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.healthPoints[0]}
          maxValue={+state.healthPoints[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'healthPoints')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.SPEED} open={state.speed.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.speed[0]}
          maxValue={+state.speed[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'speed')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.COLOR} open={state.color.length > 0}>
        <MultiRangeSlider
          min={0}
          max={10000}
          minValue={+state.color[0]}
          maxValue={+state.color[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'color')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.ATTACK} open={state.attack.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.attack[0]}
          maxValue={+state.attack[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'attack')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.DEFENCE} open={state.defence.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.defence[0]}
          maxValue={+state.defence[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'defence')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.GENERAL_TALENT}
        open={state.generalTalent.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.generalTalent[0]}
          maxValue={+state.generalTalent[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'generalTalent')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.GROWTH_TALENT_FACTOR}
        open={state.growthTalentFactor.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.growthTalentFactor[0]}
          maxValue={+state.growthTalentFactor[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'growthTalentFactor')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.ELEMENT_PERCENTAGE}
        open={state.elementPercentage.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.elementPercentage[0]}
          maxValue={+state.elementPercentage[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'elementPercentage')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.SPECIAL} open={state.special.length > 0}>
        <MultiRangeSlider
          min={0}
          max={10}
          minValue={+state.special[0]}
          maxValue={+state.special[1]}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'special')
          }}
        />
      </Dropdown>
    </Menu>
  )
}

export default React.memo(NFTSections)
