type PriceRule = {
  condition_key: string
  condition_value: string
  price_modifier: string
}

type Customization = {
  part: string
  option: string
}

export function isMatchingCondition(
  priceRules: PriceRule[] | undefined,
  customization: Customization
): boolean {
  if (priceRules === undefined) { return false }
  return priceRules.some((rule) =>
    rule.condition_key === customization.part &&
    rule.condition_value === customization.option
  )
}

export function priceModifier(
  priceRules: PriceRule[] | undefined,
  customization: Customization
): string {
  if (!priceRules) {
    return ''
  }

  const matchingRule = priceRules.find(
    (rule) =>
      rule.condition_key === customization.part &&
      rule.condition_value === customization.option
  )

  return matchingRule ? matchingRule?.price_modifier : ''
}
