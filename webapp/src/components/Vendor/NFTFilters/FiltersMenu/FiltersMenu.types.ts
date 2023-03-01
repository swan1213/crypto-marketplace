import { Network } from '@kmon/schemas'

export type Props = {
  selectedCollection?: string
  selectedRarities: string[]
  selectedNetwork?: Network
  onCollectionsChange: (contract: string) => void
  onRaritiesChange: (options: string[]) => void
  onNetworkChange: (network: Network) => void
}
