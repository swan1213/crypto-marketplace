import React, { useEffect, useState } from 'react'
import { Close, Modal, Grid } from '@kmon/ui'

import { Props } from './BreedingModal.types'
import './BreedingModal.css'
import { NFTDetail } from './NFTDetail'
import { ContractName } from '@kmon/transactions'
import { Fee } from './Fee'
import { Probability } from './Probability'
import { Authorization, AuthorizationType } from '@kmon/dapps/dist/modules/authorization/types'
import { getContract } from '../../../modules/contract/utils'
import { getContractNames } from '../../../modules/vendor'
import { hasAuthorization } from '@kmon/dapps/dist/modules/authorization/utils'
import { AuthorizationModal } from '../../AuthorizationModal'

const BreedingModal = (props: Props) => {
  const {
    myNFT,
    selectedNFT,
    myBreedingOrder,
    selectedBreedingOrder,
    open,
    simulatedGenes,
    isBreeding,
    mutationFactor,
    breedingPrice,
    authorizations,
    wallet,
    onClose,
    onSimulateBreeding,
    onBreed
  } = props
  const [genes, setGenes] = useState<number[]>([])
  const [femaleTokenId, setFemaleTokenId] = useState<string | null>(null)
  const [maleTokenId, setMaleTokenId] = useState<string | null>(null)
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const classes = ["kryptomon", "breeding-modal"]

  const contractNames = getContractNames();
  const kmon = getContract({
    name: contractNames.KMONToken
  })

  const kmonftV2 = getContract({
    name: contractNames.KMONFTV2
  })

  const authorization: Authorization = {
    address: wallet!.address,
    authorizedAddress: kmonftV2.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const handleSubmit = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handleBreed()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const handleBreed = async () => {
    if (femaleTokenId && maleTokenId) {
      onBreed(femaleTokenId, maleTokenId)
    }
  }

  const simulate = async () => {
    if (myNFT && selectedNFT && myNFT.data.kryptomon?.genes && selectedNFT.data.kryptomon?.genes) {
      if (myNFT.data.kryptomon?.genes.sex > 5 && selectedNFT.data.kryptomon?.genes.sex <= 5) {
        onSimulateBreeding(myNFT.tokenId, selectedNFT.tokenId)
        setFemaleTokenId(myNFT.tokenId)
        setMaleTokenId(selectedNFT.tokenId)
      } else if (myNFT.data.kryptomon?.genes.sex <= 5 && selectedNFT.data.kryptomon?.genes.sex > 5) {
        onSimulateBreeding(selectedNFT.tokenId, myNFT.tokenId)
        setFemaleTokenId(selectedNFT.tokenId)
        setMaleTokenId(myNFT.tokenId)
      }
    }
  }

  useEffect(() => {
    if (myNFT && selectedNFT) {
      simulate()
    }
  }, [myNFT, selectedNFT])

  useEffect(() => {
    if (simulatedGenes) {
      const [, , , , , , , , , , , , , , , , , , , attack, defense, , , , constitution, healthPoints, speed, affections, crazyness, instinct, hunger, , brave, smart, , ego, ,] = simulatedGenes
      setGenes([attack, defense, speed, ego, healthPoints, constitution, affections, crazyness, instinct, hunger, brave, smart])
    }
  }, [simulatedGenes])

  return (
    <Modal size="large" open={open} closeIcon={<Close onClick={() => onClose()} />} className={classes.join(' ')}>
      <Modal.Header>&nbsp;</Modal.Header>
      <Modal.Content className="modal-content">
        <Grid columns={2} container divided stackable>
          <Grid.Row>
            <Grid.Column>
              {myNFT && <NFTDetail nft={myNFT} breedingOrder={myBreedingOrder} />}
            </Grid.Column>
            <Grid.Column>
              {selectedNFT && selectedBreedingOrder && <NFTDetail nft={selectedNFT} view="right" breedingOrder={selectedBreedingOrder} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {myNFT && selectedNFT && (
                <Fee
                  myNFT={myNFT}
                  selectedNFT={selectedNFT}
                  onBreed={handleSubmit}
                  onCancel={() => onClose()}
                  isBreeding={isBreeding}
                  breedingPrice={breedingPrice}
                  selectedBreedingOrder={selectedBreedingOrder}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {myNFT && selectedNFT && <Probability myNFT={myNFT} selectedNFT={selectedNFT} simulatedGenes={genes} mutationFactor={mutationFactor} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        onProceed={handleBreed}
        onCancel={handleClose}
      />
    </Modal>
  )
}

export default React.memo(BreedingModal)
