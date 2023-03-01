import { Coin, Network } from '@kmon/schemas'
import { FieldProps } from '@kmon/ui'

export type Props = FieldProps & {
  coin: Coin,
  defaultCoin: Coin,
  onChangeCoin: (v: Coin) => void
}
