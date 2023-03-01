export function toDecimal(value: string): string {
  return value.replace(/[^\d.]/g, '')
}

export function toItemCount(num: number) {
  return num > 0 ? num.toString() : ''
}

export function fromItemCount(value: string) {
  const num = value.split(/[,|.]/).join('')

  const result = parseInt(num, 10)

  if (isNaN(result) || result < 0) {
    return 0
  }

  return result
}
