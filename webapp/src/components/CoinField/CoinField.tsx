import React from 'react'
import { Field, CoinIcon } from '@kmon/ui'
import { Props } from './CoinField.types'
import './CoinField.css'

export default class CoinField extends React.PureComponent<Props> {
  render() {
    const { className, coin, ...rest } = this.props
    let classes = `CoinField`
    if (className) {
      classes += ' ' + className
    }
    return (
      <Field
        {...rest}
        className={classes}
        icon={<CoinIcon coin={coin} />}
        iconPosition="left"
      />
    )
  }
}
