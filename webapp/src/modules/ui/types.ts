export const View = {
  MARKET: 'market',
  ACCOUNT: 'account',
  HOME_WEARABLES: 'home_wearables',
  KRYPTOMONS: 'kryptomons',
  HOME_LAND: 'home_land',
  HOME_ENS: 'home_ens',
  PARTNERS_SUPER_RARE: 'super_rare',
  PARTNERS_MAKERS_PLACE: 'makers_place',
  PARTNERS_KNOWN_ORIGIN: 'known_origin',
  LOAD_MORE: 'load_more',
  ATLAS: 'atlas',
  ALL_ASSETS: 'all_assets'
  // LATEST_SOLD: 'latest_sold'
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Intentionally naming the variable the same as the type
export type View = typeof View[keyof typeof View]
