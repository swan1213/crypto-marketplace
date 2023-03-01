import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './ChoosePair.types'
import ChoosePair from './ChoosePair'
import { push } from 'connected-react-router'
import { resetNFTForBreedingRequest, resetSelectedNFTForBreedingRequest } from '../../../modules/breed/actions'
import {
  getData as getAuthorizations,
  getLoading as getLoadingAuthorizations
} from '@kmon/dapps/dist/modules/authorization/selectors'
import { FETCH_AUTHORIZATIONS_REQUEST } from '@kmon/dapps/dist/modules/authorization/actions'
import { RootState } from '../../../modules/reducer'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'

const mapState = (state: RootState): MapStateProps => {
  return ({
    authorizations: getAuthorizations(state)
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: (path: string) => dispatch(push(path)),
  onResetMyNFT: () => dispatch(resetNFTForBreedingRequest()),
  onResetSelectedNFT: () => dispatch(resetSelectedNFTForBreedingRequest())
})

export default connect(mapState, mapDispatch)(ChoosePair)
