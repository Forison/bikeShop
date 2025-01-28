interface Product {
  name: string
  category: string
  description: string
  basePrice: string
  images: string[]
}

interface ProductPartOption {
  partOption: string
  price: number
}

interface ProductPart {
  part: string
  partOptions: ProductPartOption[]
}

interface PriceRulePartOption {
  conditionValue: string
  conditionKey: string
  priceModifier: number
}

interface PriceRule {
  partOption: PriceRulePartOption[]
}

interface ProhibitedOption {
  part: string
  option: string
}

interface CombinationRule {
  productId: number
  prohibitedOptions: ProhibitedOption[]
}

export interface Shop {
  product: Product
  productPart: ProductPart
  priceRule: PriceRule
  combinationRule: CombinationRule
}

