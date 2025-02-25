import { Category, Shop } from "./interface/shop";

export const PRODUCT_INITIAL_VALUES: Shop = {
  product: {
    id: '',
    name: '',
    category_id: 0,
    description: '',
    base_price: 0,
    quantity: 1,
    not_customizable: true
  },
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

export const CATEGORY_INITIAL_VALUES: Category = {
  category: {
    name: '',
    product_parts: [{
      name: '',
      part_options: [{ name: '', price: 0, quantity: 0 }],
    }],
  }
}