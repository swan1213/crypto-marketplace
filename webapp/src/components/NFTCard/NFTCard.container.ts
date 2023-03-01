import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { getData, getBreedingData } from '../../modules/order/selectors'
import { MapStateProps, OwnProps, MapDispatchProps } from './NFTCard.types'
import NFTCard from './NFTCard'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  let { order, nft, breedingOrder } = ownProps
  // console.log(order, nft)
  if (!order && nft.activeOrderId) {
    const orders = getData(state)
    order = orders[nft.activeOrderId]
  }

  if (!breedingOrder && nft.activeBreedingOrderId) {
    const breedingOrders = getBreedingData(state)
    breedingOrder = breedingOrders[nft.activeBreedingOrderId]
  }
  // console.log(order, nft)
  return {
    order,
    breedingOrder
  }
}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(NFTCard)
