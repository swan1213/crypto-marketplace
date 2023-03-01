import { takeEvery, all, put } from 'redux-saga/effects'
import { Network } from '@kmon/schemas'
import { createWalletSaga } from '@kmon/dapps/dist/modules/wallet/sagas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  CHANGE_ACCOUNT,
  CHANGE_NETWORK
} from '@kmon/dapps/dist/modules/wallet/actions'
import { fetchAuthorizationsRequest } from '@kmon/dapps/dist/modules/authorization/actions'
import {
  Authorization,
  AuthorizationType
} from '@kmon/dapps/dist/modules/authorization/types'

import { getContractNames } from '../vendor'
import { contracts, getContract } from '../contract/utils'
import { isPartner } from '../vendor/utils'
import { ContractName } from '@kmon/transactions'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: +(process.env.REACT_APP_CHAIN_ID || 1),
  POLL_INTERVAL: 0
})

export function* walletSaga() {
  yield all([baseWalletSaga(), fullWalletSaga()])
}

function* fullWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWallet)
  yield takeEvery(CHANGE_ACCOUNT, handleWallet)
  yield takeEvery(CHANGE_NETWORK, handleWallet)
}

function* handleWallet(
  action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction
) {
  const { address } = action.payload.wallet

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

  const kmonftv2 = getContract({
    name: contractNames.KMONFTV2
  })

  const authorizations: Authorization[] = []

  // Buy NFT
  authorizations.push({
    address,
    authorizedAddress: marketplace.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  // Sell NFT V2 or Approve
  authorizations.push({
    address,
    authorizedAddress: marketplace.address,
    contractAddress: kmonftv2.address,
    contractName: ContractName.KMONFTV2,
    chainId: kmonftv2.chainId,
    type: AuthorizationType.APPROVAL
  })

  // Sell NFT or Approve
  authorizations.push({
    address,
    authorizedAddress: marketplace.address,
    contractAddress: kmonft.address,
    contractName: ContractName.KMONFT,
    chainId: kmonft.chainId,
    type: AuthorizationType.APPROVAL
  })

  // Bid with KMON
  authorizations.push({
    address,
    authorizedAddress: erc721Bid.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  // Bid with WBNB
  authorizations.push({
    address,
    authorizedAddress: erc721Bid.address,
    contractAddress: wbnb.address,
    contractName: ContractName.WBNB,
    chainId: wbnb.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  // Buy item
  authorizations.push({
    address,
    authorizedAddress: item.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  // Breed
  authorizations.push({
    address,
    authorizedAddress: kmonftv2.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  yield put(fetchAuthorizationsRequest(authorizations))
}
