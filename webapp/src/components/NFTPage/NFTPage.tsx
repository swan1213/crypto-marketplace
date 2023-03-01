import React from 'react'
import { Page } from '@kmon/ui'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { NFTProviderPage } from '../NFTProviderPage'
import { NFTDetail } from '../Vendor/NFTDetail'
import './NFTPage.css'

const NFTPage = () => {
  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation isFullscreen />
      </div>
      <Page className="NFTPage" isFullscreen>
        <NFTProviderPage>{(nft, order) => <NFTDetail nft={nft} order={order} />}</NFTProviderPage>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(NFTPage)
