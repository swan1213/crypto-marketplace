import { UserMenu as BaseUserMenu } from '@kmon/dapps/dist/containers'
import { Props } from './UserMenu.types'

const UserMenu = (props: Props) => {
  const { onClickAccount, onClickActivity, onClickSettings } = props
  return (
    <>
      <BaseUserMenu
        onClickSettings={onClickSettings}
        onClickActivity={onClickActivity}
        onClickAccount={onClickAccount}
      />
    </>
  )
}

export default UserMenu
