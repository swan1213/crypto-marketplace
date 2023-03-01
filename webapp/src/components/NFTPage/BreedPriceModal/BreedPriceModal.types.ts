import { Authorization } from "@kmon/dapps/dist/modules/authorization/types";
import { Wallet } from "@kmon/dapps/dist/modules/wallet/types";
import { BreedingOrder } from "../../../modules/breedingOrder/types";
import { NFT } from "../../../modules/nft/types";

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  show: boolean
  nft: NFT
  isOwner: boolean
  isAddingToBreedingCentre: boolean
  currentNFTBreedingOrder: BreedingOrder | null
  isCancelingBreed: boolean
  onSubmitBreedPrice: (price: string) => void
  onCancel: () => void
  onCancelListing: () => void
}
