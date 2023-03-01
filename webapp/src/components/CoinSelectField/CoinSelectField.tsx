import React from 'react'
import { SelectField, CoinIcon } from '@kmon/ui'
import { Coin } from '@kmon/schemas'
import { Props } from './CoinSelectField.types'
import './CoinSelectField.css'

export default class CoinSelectField extends React.PureComponent<Props> {
  render() {
    const { className, coin, defaultCoin, onChangeCoin, ...rest } = this.props
    let classes = ''
    if (className) {
      classes += ' ' + className
    }
    return (
      <SelectField
        {...rest}
        className={classes}
        options={[
        { key: 1, text: <span><CoinIcon coin={Coin.KMON} /> KMON</span>, value: Coin.KMON },
        { key: 2, text: <span><CoinIcon coin={coin} /> {coin}</span>, value: coin },
        ]}
        onChange={(_, a) => onChangeCoin(a.value as Coin)}
        defaultValue={defaultCoin}
      />
    )
  }
}
