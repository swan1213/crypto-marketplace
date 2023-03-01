export type Item = {
  itemId: string
  name: string;
  price: string;
  priceWithCandies: string;
}

export enum ItemVersion {
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3'
}
