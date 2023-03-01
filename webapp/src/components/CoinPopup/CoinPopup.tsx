import React from 'react'
import { Coin, Network } from '@kmon/schemas'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { CoinIcon, Popup } from '@kmon/ui'
import { Props } from './CoinPopup.types'

const CoinPopup = (props: Props) => {
  const { withTooltip, ...coinPopupProps } = props

  if (withTooltip && !coinPopupProps.coin) {
    throw new Error(
      "You need to specify the kmon network if you're going to show a tooltip"
    )
  }

  return (
    <Popup
      content={t('coin.running_on', {
        coin: coinPopupProps.coin || Coin.KMON,
        network: t(
          `networks.${(coinPopupProps.network || Network.BSC).toLowerCase()}`
        )
      })}
      disabled={!withTooltip}
      position="top center"
      trigger={<CoinIcon {...coinPopupProps} />}
    />
  )
}
CoinPopup.defaultProps = {
  network: Network.BSC
}

export default React.memo(CoinPopup)
