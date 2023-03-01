import { ItemVersion } from "../../../modules/item/types";

export type Props = {
  isTxPending: boolean
  onBuy: (itemVersion: ItemVersion) => void
}
