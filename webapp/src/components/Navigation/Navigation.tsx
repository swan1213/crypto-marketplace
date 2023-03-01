import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Responsive } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import { locations } from '../../modules/routing/locations'
import { Props, NavigationTab } from './Navigation.types'

const Navigation = (props: Props) => {
  const { activeTab, isFullscreen } = props
  return (
    <Tabs isFullscreen={isFullscreen}>
      <Tabs.Left>
        <Link to={locations.browse()}>
          <Tabs.Tab active={activeTab === NavigationTab.BROWSE}>
            {t('navigation.kryptomons')}
          </Tabs.Tab>
        </Link>
        <Link to={locations.items()}>
          <Tabs.Tab active={activeTab === NavigationTab.ITEMS}>
            {t('navigation.items')}
          </Tabs.Tab>
        </Link>
        <Link to={locations.bids()}>
          <Tabs.Tab active={activeTab === NavigationTab.MY_BIDS}>
            {t('navigation.my_bids')}
          </Tabs.Tab>
        </Link>
        <Link to={locations.currentAccount({ onlyOnSale: false })}>
          <Tabs.Tab active={activeTab === NavigationTab.MY_ASSETS}>
            {t('navigation.my_assets')}
          </Tabs.Tab>
        </Link>
        <Link to={locations.breed('undefined', 'undefined')}>
          <Tabs.Tab active={activeTab === NavigationTab.BREEDING_CENTER}>
            {t('navigation.breeding_center')}
          </Tabs.Tab>
        </Link>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Link to={locations.activity()}>
            <Tabs.Tab active={activeTab === NavigationTab.ACTIVITY}>
              {t('navigation.activity')}
            </Tabs.Tab>
          </Link>
        </Responsive>
      </Tabs.Left>
    </Tabs>
  )
}

export default React.memo(Navigation)
