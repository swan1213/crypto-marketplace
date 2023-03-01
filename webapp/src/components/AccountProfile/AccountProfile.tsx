import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Profile } from '@kmon/dapps/dist/containers'

import { useTimer } from '../../lib/timer'
import { Props } from './AccountProfile.types'
import './AccountProfile.css'
import Copy from '../../images/copy.svg'

const AccountProfile = (props: Props) => {
  const { wallet } = props
  const [hasCopiedAddress, setHasCopiedAddress] = useTimer(1200)

  if (!wallet) {
    return null
  }

  return (
    <div className="AccountProfile">
      {/* <Profile
        size={'massive'}
        address={wallet.address}
        imageOnly
        inline={false}
      /> */}
      <div className="profile-account-name">My Wallet</div>
      <div className="profile-address">
        <div
          className={`profile-address-hash ${hasCopiedAddress &&
            'profile-address-hash-hidden'}`}
        >
          {wallet.address}
        </div>
        <CopyToClipboard text={wallet.address} onCopy={setHasCopiedAddress}>
          <img aria-label="Copy address" className="copy" src={Copy} />
        </CopyToClipboard>
        {hasCopiedAddress && (
          <span className="profile-copied-text-desktop copied">
            {t('account_page.copied')}
          </span>
        )}
      </div>
    </div>
  )
}

export default React.memo(AccountProfile)
