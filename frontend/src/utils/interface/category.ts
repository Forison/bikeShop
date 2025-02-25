import { ProductPart, ProductPartOption } from "./shop"

export interface Category {
  id: number
  name: string
}

// interface Option {
//   options: ProductPartOption
// }
export interface CategoryWithOptions extends Category {
  parts_with_options: ProductPart[]
}