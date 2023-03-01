import { connect } from 'react-redux'

import { MapStateProps, MapDispatchProps, OwnProps, MapDispatch } from './BreedingCenterPage.types'
import BreedingCenterPage from './BreedingCenterPage'
import { RootState } from '../../modules/reducer'
import { getContractAddress, getMutationFactor, getMyNFT, getSelectedNFT, getTokenId } from '../../modules/breed/selectors'
import { selectNFTForBreedingRequest } from '../../modules/breed/actions'
import { NFT } from "../../modules/nft/types"
import { fetchNFTRequest } from '../../modules/nft/actions'
import { getMyBreedingOrder, getSelectedBreedingOrder } from '../../modules/breedingOrder/selectors'
import { getBreedingFee } from '../../modules/subgraph/selectors'
import { getBreedingFeeRequest } from '../../modules/subgraph/actions'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const contractAddress = ownProps.contractAddress || getContractAddress(state)
  const tokenId = ownProps.tokenId || getTokenId(state)
  const myNFT = getMyNFT(state)
  const selectedNFT = getSelectedNFT(state)
  const myBreedingOrder = getMyBreedingOrder(state)
  const selectedBreedingOrder = getSelectedBreedingOrder(state)
  const mutationFactor = getMutationFactor(state)

  return {
    contractAddress,
    tokenId,
    myNFT,
    selectedNFT,
    myBreedingOrder,
    selectedBreedingOrder,
    mutationFactor
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchRequest: (contractAddress: string, tokenId: string) =>
    dispatch(fetchNFTRequest(contractAddress, tokenId)),
  onSelectNFTForBreeding: (nft: NFT) =>
    dispatch(selectNFTForBreedingRequest(nft)),
  onGetBreedingFee: () =>
    dispatch(getBreedingFeeRequest())
})

export default connect(mapState, mapDispatch)(BreedingCenterPage)
