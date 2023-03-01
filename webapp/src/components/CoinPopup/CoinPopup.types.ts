import { Network } from '@kmon/schemas'
import { CoinIconProps } from '@kmon/ui'

export type Props = CoinIconProps & {
  network: Network
  withTooltip?: boolean
}
