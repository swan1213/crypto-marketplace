import React, { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Footer } from '@kmon/dapps/dist/containers'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { AuthorizationType } from '@kmon/dapps/dist/modules/authorization/types'
import { Page, Grid, Blockie, Loader, Form } from '@kmon/ui'
import { ContractName } from '@kmon/transactions'

import { locations } from '../../modules/routing/locations'
import { shortenAddress } from '../../modules/wallet/utils'
import { Navbar } from '../Navbar'
import { Navigation } from '../Navigation'
import { Authorization } from './Authorization'
import { getContractNames } from '../../modules/vendor'
import { getContract } from '../../modules/contract/utils'
import { useTimer } from '../../lib/timer'
import { Props } from './SettingsPage.types'
import './SettingsPage.css'

const SettingsPage = (props: Props) => {
  const {
    wallet,
    authorizations,
    isLoadingAuthorization,
    isConnecting,
    hasError,
    onNavigate
  } = props

  const [hasCopiedText, setHasCopiedAddress] = useTimer(1200)

  useEffect(() => {
    if (!isConnecting && !wallet) {
      onNavigate(locations.signIn())
    }
  }, [isConnecting, wallet, onNavigate])

  const contractNames = getContractNames()

  const marketplace = getContract({
    name: contractNames.MARKETPLACE,
  })

  const erc721Bid = getContract({
    name: contractNames.ERC721Bid
  })

  const kmon = getContract({
    name: contractNames.KMONToken,
  })

  const wbnb = getContract({
    name: contractNames.WBNB
  })

  const item = getContract({
    name: contractNames.Item,
  })

  const kmonft = getContract({
    name: contractNames.KMONFT
  })

  const kmonftV2 = getContract({
    name: contractNames.KMONFTV2
  })

  const authorizationsForSelling = authorizations.filter(authorization => {
    const contract = getContract({ address: authorization.contractAddress })
    return contract.category != null
  })

  return (
    <>
      <Navbar isFullscreen />
      <Navigation />
      <Page className="SettingsPage">
        {isConnecting ? (
          <Loader size="massive" active />
        ) : wallet ? (
          <Grid>
            <Grid.Row>
              <Grid.Column
                className="left-column secondary-text"
                computer={4}
                mobile={16}
              >
                {t('global.address')}
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                <div className="blockie-container">
                  <Blockie seed={wallet.address} scale={12} />
                </div>
                <div className="address-container">
                  <div className="address">
                    {isMobile()
                      ? shortenAddress(wallet.address)
                      : wallet.address}
                  </div>
                  <CopyToClipboard
                    text={wallet.address}
                    onCopy={setHasCopiedAddress}
                  >
                    {hasCopiedText ? (
                      <span className="copy-text">
                        {t('settings_page.copied')}
                      </span>
                    ) : (
                      <span className="copy-text link">
                        {t('settings_page.copy_address')}
                      </span>
                    )}
                  </CopyToClipboard>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                className="left-column secondary-text"
                computer={4}
                mobile={16}
              >
                {t('settings_page.authorizations')}
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                {isLoadingAuthorization ? (
                  <Loader size="massive" active />
                ) : (
                  <div className="authorization-checks-container">
                    {hasError ? (
                      <div className="authorization-checks">
                        <p className="danger-text">
                          {t('settings_page.authorization_error')}
                          <br />
                          {t('settings_page.authorization_error_contact')}
                        </p>
                      </div>
                    ) : (
                      <Form>
                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_buying_nft')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: marketplace.address,
                              contractAddress: kmon.address,
                              contractName: ContractName.KMONToken,
                              chainId: kmon.chainId,
                              type: AuthorizationType.ALLOWANCE
                            }}
                          />
                        </div>

                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_selling_or_approving')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: marketplace.address,
                              contractAddress: kmonft.address,
                              contractName: ContractName.KMONFT,
                              chainId: kmonft.chainId,
                              type: AuthorizationType.APPROVAL
                            }}
                          />
                        </div>

                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_selling_or_approving')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: marketplace.address,
                              contractAddress: kmonftV2.address,
                              contractName: ContractName.KMONFTV2,
                              chainId: kmonftV2.chainId,
                              type: AuthorizationType.APPROVAL
                            }}
                          />
                        </div>

                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_bidding_with_kmon')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: erc721Bid.address,
                              contractAddress: kmon.address,
                              contractName: ContractName.KMONToken,
                              chainId: kmon.chainId,
                              type: AuthorizationType.ALLOWANCE
                            }}
                          />
                        </div>

                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_bidding_with_wbnb')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: erc721Bid.address,
                              contractAddress: wbnb.address,
                              contractName: ContractName.WBNB,
                              chainId: wbnb.chainId,
                              type: AuthorizationType.ALLOWANCE
                            }}
                          />
                        </div>

                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_buying_lootbox')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: item.address,
                              contractAddress: kmon.address,
                              contractName: ContractName.KMONToken,
                              chainId: kmon.chainId,
                              type: AuthorizationType.ALLOWANCE
                            }}
                          />
                        </div>

                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_breeding')}
                          </label>
                          <Authorization
                            authorization={{
                              address: wallet.address,
                              authorizedAddress: kmonftV2.address,
                              contractAddress: kmon.address,
                              contractName: ContractName.KMONToken,
                              chainId: kmon.chainId,
                              type: AuthorizationType.ALLOWANCE
                            }}
                          />
                        </div>

                        {authorizationsForSelling.length > 0 ? (
                          <div className="authorization-checks">
                            <label className="secondary-text">
                              {t('settings_page.for_selling')}
                            </label>

                            {authorizationsForSelling.map(authorization => {
                              return (
                                <Authorization
                                  key={
                                    authorization.authorizedAddress +
                                    authorization.contractAddress
                                  }
                                  authorization={authorization}
                                />
                              )
                            })}
                          </div>
                        ) : null}
                      </Form>
                    )}
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(SettingsPage)
