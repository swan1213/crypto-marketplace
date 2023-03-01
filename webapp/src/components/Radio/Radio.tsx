import { FC } from 'react'
import classnames from 'classnames'
import { Props } from './Radio.types'
import './Radio.css'

const Radio: FC<Props> = ({ checked, label, onChange }) => {
  const handleRadioClick = () => {
    onChange({ checked: !checked, label })
  }

  return (
    <div className="radio-container">
      <div
        className={classnames('radio-passive', checked && 'radio-active')}
        onClick={handleRadioClick}
      ></div>
      <p className={classnames('label', checked && 'label-active')}>{label}</p>
    </div>
  )
}

export default Radio
