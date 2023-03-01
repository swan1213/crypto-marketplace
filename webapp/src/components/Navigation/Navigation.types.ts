export enum NavigationTab {
  BROWSE = 'browse',
  PARTNERS = 'partners',
  PARTNER = 'partner',
  MY_ASSETS = 'my_assets',
  MY_BIDS = 'my_bids',
  ACTIVITY = 'activity',
  KRYPTOMONS = 'kryptomons',
  ITEMS = 'items',
  LOOTBOXES = 'lootboxes',
  BREEDING_CENTER = 'breeding_center'
}

export type Props = {
  activeTab?: NavigationTab
  isFullscreen?: boolean
}

export type MapStateProps = {}
export type MapDispatchProps = {}
