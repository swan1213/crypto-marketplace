import React, { useEffect } from 'react'
import { Card, Page } from '@kmon/ui'
import { fromWei } from 'web3x-es/utils'

import { NavigationTab } from '../Navigation/Navigation.types'
import { locations } from '../../modules/routing/locations'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { Props } from './LootboxesPage.types'
import { LootboxCard } from './LootboxCard'
import basicLootbox from '../../images/items/lootbox_basic.png'
import mediumLootbox from '../../images/items/lootbox_medium.png'
import premiumLootbox from '../../images/items/lootbox_premium.png'
import unfreezePotion from '../../images/items/unfreeze_potion.png'

export const images: Record<string, string> = {
  'lootbox_basic': basicLootbox,
  'lootbox_medium': mediumLootbox,
  'lootbox_premium': premiumLootbox,
  'unfreeze_potion': unfreezePotion
}

const LootboxesPage = (props: Props) => {
  const {
    wallet,
    isConnecting,
    isFullscreen,
    items,
    onRedirect,
    onFetchItems
  } = props

  const isConnected = !!wallet

  useEffect(() => {
    if (isConnected) {
      onFetchItems()
    } else {
      onRedirect(locations.signIn('items'))
    }
  }, [isConnected])

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation
          activeTab={NavigationTab.ITEMS}
          isFullscreen={isFullscreen}
        />
      </div>
      <Page className="NFTBrowse">
        <Card.Group>
          {Object.values(items).map((item) => (
            <LootboxCard
              key={item.itemId}
              itemId={item.itemId}
              name={item.name}
              image={images[item.name.toLocaleLowerCase()]}
              price={fromWei(item.price, 'ether')}
              priceWithCandies={item.priceWithCandies ? fromWei(item.priceWithCandies, 'ether') : '0'}
            />
          ))}
        </Card.Group>
      </Page>
      <Footer isFullscreen={isFullscreen} />
    </>
  )
}

export default React.memo(LootboxesPage)
