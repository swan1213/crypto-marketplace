import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { walletReducer as wallet } from '@kmon/dapps/dist/modules/wallet/reducer'
import { translationReducer as translation } from '@kmon/dapps/dist/modules/translation/reducer'
import { storageReducer as storage } from '@kmon/dapps/dist/modules/storage/reducer'
import { transactionReducer as transaction } from '@kmon/dapps/dist/modules/transaction/reducer'
import { profileReducer as profile } from '@kmon/dapps/dist/modules/profile/reducer'
import { authorizationReducer as authorization } from '@kmon/dapps/dist/modules/authorization/reducer'
import { toastReducer as toast } from '@kmon/dapps/dist/modules/toast/reducer'

import { accountReducer as account } from './account/reducer'
import { bidReducer as bid } from './bid/reducer'
import { nftReducer as nft } from './nft/reducer'
import { orderReducer as order } from './order/reducer'
import { proximityReducer as proximity } from './proximity/reducer'
import { routingReducer as routing } from './routing/reducer'
import { tileReducer as tile } from './tile/reducer'
import { uiReducer as ui } from './ui/reducer'
import { itemReducer as item } from './item/reducer'
import { subgraphReducer as subgraph } from './subgraph/reducer'
import { breedReducer as breed } from './breed/reducer'
import { breedingOrderReducer as breedingOrder } from './breedingOrder/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    account,
    authorization,
    bid,
    nft,
    order,
    profile,
    proximity,
    router: connectRouter(history),
    routing,
    storage,
    tile,
    toast,
    transaction,
    translation,
    ui,
    wallet,
    item,
    subgraph,
    breed,
    breedingOrder
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
