import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import classnames from 'classnames'
import { Props } from './RadioRange.types'
import './RadioRange.css'
import { RadioContainer, Radio } from '../../Radio'

const RadioRange: FC<Props> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange
  // radioState,
  // radioOptions,
  // onRadioChange
}) => {
  const [minVal, setMinVal] = useState(minValue ? minValue : min)
  const [maxVal, setMaxVal] = useState(maxValue ? maxValue : max)

  const handleMinChange = (
    event: ChangeEvent<HTMLInputElement>,
    callback?: ({ min, max }: { min?: number; max?: number }) => void
  ) => {
    const value = Math.min(+event.target.value, maxVal)
    if (value > min) {
      setMinVal(value)
      event.target.value = value.toString()
      callback && callback({ min: value })
    } else {
      setMinVal(min)
      event.target.value = min.toString()
      callback && callback({ min })
    }
  }
  const handleMaxChange = (
    event: ChangeEvent<HTMLInputElement>,
    callback?: ({ min, max }: { min?: number; max?: number }) => void
  ) => {
    const value = Math.max(+event.target.value, minVal)
    setMaxVal(value)
    event.target.value = value.toString()
    callback && callback({ max: value })
  }
  const handleChange = ({ min, max }: { min?: number; max?: number }) => {
    onChange({ min: min || minVal, max: max || maxVal })
  }

  return (
    <div className="slider-container">
      <div className="slider">
        {/* <RadioContainer>
          {radioOptions.map(elem => {
            return (
              <Radio
                label={elem}
                onChange={() => onRadioChange(elem)}
                checked={radioState.indexOf(elem) > -1}
              />
            )
          })}
        </RadioContainer> */}
        <div className="inputs">
          <div className="radio-input-container">
            <label htmlFor="min">From</label>
            <input
              type="number"
              id="min"
              className="input"
              value={minVal}
              onChange={event => {
                handleMinChange(event, handleChange)
              }}
            />
          </div>
          <div className="radio-input-container">
            <label htmlFor="max">To</label>
            <input
              type="number"
              id="max"
              className="input"
              value={maxVal}
              onChange={event => {
                handleMaxChange(event, handleChange)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RadioRange
