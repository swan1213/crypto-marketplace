import React, { useEffect, useState } from 'react'
import { Page, Responsive } from '@kmon/ui'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Props } from './BreedingCenterPage.types'
import { NavigationTab } from '../Navigation/Navigation.types'
import { Navigation } from '../Navigation'
import { ChoosePair } from './ChoosePair'
import { Row } from '../Layout/Row'
import { Column } from '../Layout/Column'
import { NFTSidebar } from '../Vendor/NFTSidebar'
import { NFTList } from '../NFTList'
import { NFTFilters } from '../Vendor/NFTFilters'
import { NFT } from "../../modules/nft/types"
import { BreedingModal } from './BreedingModal'
import { Wallet } from '../Wallet'
import './BreedingCenterPage.style.css'

const BreedingCenterPage = (props: Props) => {
  const {
    contractAddress,
    tokenId,
    myNFT,
    selectedNFT,
    myBreedingOrder,
    selectedBreedingOrder,
    mutationFactor,
    onFetchRequest,
    onSelectNFTForBreeding,
    onGetBreedingFee
  } = props
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (contractAddress && tokenId && contractAddress !== 'undefined' && tokenId !== 'undefined') {
      onFetchRequest(contractAddress, tokenId)
    }
  }, [contractAddress, tokenId, onFetchRequest])

  useEffect(() => {
    onGetBreedingFee()
  }, [])

  const handleSelectCard = (nft: NFT) => {
    onSelectNFTForBreeding(nft)
  }

  const handleCompare = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation activeTab={NavigationTab.BREEDING_CENTER} />
      </div>
      <Page className="NFTBrowse">
        <Row>
          <Column align="left" className="sidebar">
            <NFTSidebar />
          </Column>
          <Column align="right" grow={true}>
            <ChoosePair
              myNFT={myNFT}
              selectedNFT={selectedNFT}
              onCompare={handleCompare}
              mutationFactor={mutationFactor}
            />
            <NFTFilters />
            <NFTList isPreventClick onClickCard={handleSelectCard} />
          </Column>
        </Row>
      </Page>
      <Footer />
      <Wallet>
        {wallet => (
          <BreedingModal
            myNFT={myNFT}
            selectedNFT={selectedNFT}
            myBreedingOrder={myBreedingOrder}
            selectedBreedingOrder={selectedBreedingOrder}
            open={showModal}
            onClose={() => setShowModal(false)}
            mutationFactor={mutationFactor}
            wallet={wallet}
          />
        )}
      </Wallet>
    </>
  )
}

export default React.memo(BreedingCenterPage)
