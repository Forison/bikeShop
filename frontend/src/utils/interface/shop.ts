import { ProductCustomizations } from "./customization"

export interface Product {
  id: string
  name: string
  category: string
  description: string
  base_price: number
  quantity: number
  price_rule?: PriceRulePartOption[]
  customization_options?: ProductCustomizations
}

export interface ProductPartOption {
  name: string
  price: number
  quantity: number
}

export interface ProductPart {
  name: string
  part_options: ProductPartOption[]
}

export interface PriceRulePartOption {
  condition_value: string
  condition_key: string
  price_modifier: string
}

export interface PriceRule {
  part_option: PriceRulePartOption[]
}

interface ProhibitedOption {
  part: string
  option: string
}

interface CombinationRule {
  prohibited_options: ProhibitedOption[]
}

export interface Shop {
  product: Product
  product_parts: ProductPart[]
  price_rule: PriceRule
  combination_rule: CombinationRule
}
