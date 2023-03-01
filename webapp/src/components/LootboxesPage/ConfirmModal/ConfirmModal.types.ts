import { Item } from '../../../modules/item/types'

export type Props = {
  currentItem: Item | undefined,
  currentItemCount: string,
  isBuyingItem: boolean,
  showConfirmModal: boolean,
  handleProceed: (itemCount: string) => void,
  onCloseModal: () => void,
}
