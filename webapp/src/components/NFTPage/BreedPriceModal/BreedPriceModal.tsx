import { Authorization, AuthorizationType } from "@kmon/dapps/dist/modules/authorization/types"
import { hasAuthorization } from "@kmon/dapps/dist/modules/authorization/utils"
import { t, T } from "@kmon/dapps/dist/modules/translation/utils"
import { Coin } from "@kmon/schemas"
import { ContractName } from "@kmon/transactions"
import { Button, Form, Modal } from "@kmon/ui"
import React, { useCallback, useState } from "react"

import { fromCoin, toCoin } from "../../../lib/kmon"
import { getContract } from "../../../modules/contract/utils"
import { getNFTName } from "../../../modules/nft/utils"
import { getContractNames } from "../../../modules/vendor"
import { AuthorizationModal } from "../../AuthorizationModal"
import { CoinField } from "../../CoinField"
import { Props } from "./BreedPriceModal.types"
import "./BreedPriceModal.css"

const BreedPriceModal = (props: Props) => {
  const {
    wallet,
    authorizations,
    show,
    nft,
    isOwner,
    isAddingToBreedingCentre,
    currentNFTBreedingOrder,
    isCancelingBreed,
    onSubmitBreedPrice,
    onCancel,
    onCancelListing
  } = props
  const [price, setPrice] = useState('')
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const handleExecuteBreed = useCallback(() => {
    if (price) {
      onSubmitBreedPrice(price)
    }
  }, [price, onSubmitBreedPrice])

  if (!wallet) {
    return null
  }
  const contractNames = getContractNames()
  const kmon = getContract({
    name: contractNames.KMONToken
  })
  const kmonftV2 = getContract({
    name: contractNames.KMONFTV2
  })
  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: kmonftV2.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: nft.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const isDisabled = !nft || !isOwner || fromCoin(price, Coin.KMON) === 0

  const handleSubmit = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handleExecuteBreed()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleCancelListing = () => {
    onCancelListing()
  }

  const handleClose = () => setShowAuthorizationModal(false)

  return (
    <>
      <Modal size="small" open={show} className="BreedPriceModal">
        <Modal.Header>{t('nft_page.breed_price_modal.title')}</Modal.Header>
        <Modal.Content>
          <T
            id="nft_page.breed_price_modal.line_one"
            values={{
              name: <b>{getNFTName(nft)}</b>,
              amount: 1000
            }}
          />
          <br />
          <T id="nft_page.breed_price_modal.line_two" />
          <CoinField
            className="mana-input"
            label={t('nft_page.breed_price_modal.price')}
            coin={Coin.KMON}
            placeholder={toCoin(1000)}
            value={price}
            onChange={(_event, props) => {
              const newPrice = fromCoin(props.value, Coin.KMON)
              setPrice(toCoin(newPrice))
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <div
            className="ui button"
            onClick={() => {
              setPrice('')
              onCancel()
            }}
          >
            {t('global.cancel')}
          </div>
          {currentNFTBreedingOrder && (
            <Button
              primary
              disabled={!nft || !isOwner}
              loading={isCancelingBreed}
              className="cancel_listing_button"
              onClick={handleCancelListing}
            >
              {t('nft_page.cancel_listing')}
            </Button>
          )}
          <Button
            primary
            disabled={isDisabled || isAddingToBreedingCentre}
            loading={isAddingToBreedingCentre}
            onClick={handleSubmit}
          >
            {t('global.proceed')}
          </Button>
        </Modal.Actions>
      </Modal>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        onProceed={handleExecuteBreed}
        isLoading={isAddingToBreedingCentre}
        onCancel={handleClose}
      />
    </>
  )
}

export default React.memo(BreedPriceModal)