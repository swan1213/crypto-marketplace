import React from 'react'
import { HeaderMenu, Header, Button, Loader } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { NFTCard } from '../../NFTCard'
import { Props } from './Slideshow.types'
import './Slideshow.css'

const Slideshow = (props: Props) => {
  const { title, nfts, isSubHeader, isLoading, onViewAll } = props

  const renderNfts = () =>
    nfts.map((nft, index) => (
      <NFTCard
        key={index}
        nft={nft}
        status={{ showPrice: true }}
      />
    ))

  return (
    <div className="Slideshow">
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header sub={isSubHeader}>{title}</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Button basic onClick={onViewAll}>
            {t('slideshow.view_all')}
            <i className="caret" />
          </Button>
        </HeaderMenu.Right>
      </HeaderMenu>
      <div className="nfts">
        {isLoading ? (
          nfts.length === 0 ? (
            <Loader active size="massive" />
          ) : (
            renderNfts()
          )
        ) : nfts.length > 0 ? (
          renderNfts()
        ) : null}
      </div>
    </div>
  )
}

export default React.memo(Slideshow)
