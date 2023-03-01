type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

export type GenesV2 = FixedLengthArray<[
  number, number, number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number
]>