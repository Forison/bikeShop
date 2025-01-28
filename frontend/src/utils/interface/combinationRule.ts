interface ProhibitedOption {
  part: string[]
}

export interface CombinationRule {
  productId: number
  prohibitedOptions: ProhibitedOption[]
}