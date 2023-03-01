import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import classnames from 'classnames'
import { Props } from './MultiRangeSlider.types'
import './MultiRangeSlider.css'

const MultiRangeSlider: FC<Props> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
  isInteger
}) => {
  const [minVal, setMinVal] = useState(minValue ? minValue : min)
  const [maxVal, setMaxVal] = useState(maxValue ? maxValue : max)
  const minValRef = useRef<HTMLInputElement>(null)
  const maxValRef = useRef<HTMLInputElement>(null)
  const range = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!minValue) {
      setMinVal(min)
    }
    if (!maxValue) {
      setMaxVal(max)
    }
  }, [minValue, maxValue])

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value)

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent])

  const handleMinChange = (
    event: ChangeEvent<HTMLInputElement>,
    callback?: ({ min, max }: { min?: number; max?: number }) => void
  ) => {
    const formattedValue = Math.min(+event.target.value, maxVal)
    const value = isInteger ? Math.round(formattedValue) : formattedValue
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
    const formattedValue = Math.max(+event.target.value, minVal)
    const value = isInteger ? Math.round(formattedValue) : formattedValue
    if (value < max) {
      setMaxVal(value)
      event.target.value = value.toString()
      callback && callback({ max: value })
    } else {
      setMaxVal(max)
      event.target.value = max.toString()
      callback && callback({ max })
    }
  }
  const handleChange = ({ min, max }: { min?: number; max?: number }) => {
    onChange({ min: min || minVal, max: max || maxVal })
  }

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={handleMinChange}
        className={classnames('thumb thumb--zindex-3', {
          'thumb--zindex-5': minVal > max - 100
        })}
        onMouseUp={() => handleChange({})}
        onTouchEnd={() => handleChange({})}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxChange}
        className="thumb thumb--zindex-4"
        onMouseUp={() => handleChange({})}
        onTouchEnd={() => handleChange({})}
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="inputs">
          <div className="input-container">
            <label htmlFor="min">Min</label>
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
          <div className="input-container">
            <label htmlFor="max">Max</label>
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

export default MultiRangeSlider
