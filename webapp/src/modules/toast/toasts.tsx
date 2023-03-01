import { ToastType } from '@kmon/ui'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'

const DISCORD_URL = process.env.REACT_APP_DISCORD_URL

export function getMetaTransactionFailureToast() {
  return {
    type: ToastType.ERROR,
    title: t('toast.meta_transaction_failure.title'),
    body: (
      <T
        id="toast.meta_transaction_failure.body"
        values={{
          br: <br />,
          discord_link: (
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          )
        }}
      />
    ),
    timeout: 6000,
    closable: true
  }
}

export function getBreedFailureToast(message: string) {
  return {
    type: ToastType.ERROR,
    title: 'Breed',
    body: message,
    timeout: 6000,
    closable: true
  }
}
