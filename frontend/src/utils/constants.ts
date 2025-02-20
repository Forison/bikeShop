import { Shop } from "./interface/shop";

export const PRODUCT_INITIAL_VALUES: Shop = {
  product: {
    id: '',
    name: '',
    category: '',
    description: '',
    base_price: 0,
    quantity: 0
  },
  product_parts: [{
    name: '',
    part_options: [{ name: '', price: 0, quantity: 0 }],
  }],
  price_rule: {
    part_option: [
      {
        condition_key: '',
        condition_value: '',
        price_modifier: '',
      },
    ],
  },
  combination_rule: {
    prohibited_options: [{
      part: '',
      option: ''
    }],
  },
}