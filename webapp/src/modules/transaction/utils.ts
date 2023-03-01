import {
  GrantTokenRequestAction,
  RevokeTokenRequestAction
} from '@kmon/dapps/dist/modules/authorization/actions'
import { Transaction } from '@kmon/dapps/dist/modules/transaction/types'

export function hasTransactionPending(
  transactions: Transaction[],
  authorizedAddress: string,
  contractAddress: string
) {
  return transactions.some((transaction: any) => {
    const { authorization } = transaction.payload as
      | GrantTokenRequestAction['payload']
      | RevokeTokenRequestAction['payload']
    return (
      authorization.authorizedAddress.toLowerCase() ===
      authorizedAddress.toLowerCase() &&
      authorization.contractAddress.toLowerCase() ===
      contractAddress.toLowerCase()
    )
  })
}
