export type Props = {
  min: number
  max: number
  minValue?: number
  maxValue?: number
  onChange: ({ min, max }: { min: number; max: number }) => void
  radioState: string[]
  radioOptions: string[]
  onRadioChange: Function
}
