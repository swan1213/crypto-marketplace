import React from 'react'
import { Loader } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { NFTProvider } from '../NFTProvider'
import { Props } from './NFTProviderPage.types'

const Loading = () => (
  <div className="nft-center">
    <Loader active size="huge" />
  </div>
)

const NotFound = () => (
  <div className="nft-center">
    <p className="secondary-text">{t('global.not_found')}&hellip;</p>
  </div>
)

const NFTProviderPage = (props: Props) => {
  const { isConnecting, children } = props
  return (
    <NFTProvider>
      {(nft, order, isNFTLoading) => {
        const isLoading = isConnecting || isNFTLoading
        return (
          <>
            {isLoading ? <Loading /> : null}
            {!isLoading && !nft ? <NotFound /> : null}
            {!isLoading && nft ? children(nft, order) : null}
          </>
        )
      }}
    </NFTProvider>
  )
}

export default React.memo(NFTProviderPage)
