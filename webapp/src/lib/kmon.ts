import { Coin } from '@kmon/schemas'
import { fromWei } from 'web3x-es/utils'

export function formatCoin(value: string) {
  return Number(fromWei(value, 'ether')).toLocaleString()
}

export function toCoin(num: number) {
  return num > 0 ? num.toString() : ''
}

export function fromCoin(value: string, coin: Coin) {
  const num = coin === Coin.KMON ? value.split(/[,|.]/).join('') : value

  const result = coin === Coin.KMON ? parseInt(num, 10) : parseFloat(num)

  if (isNaN(result) || result < 0) {
    return 0
  }

  return result
}
