interface ProductCustomization {
  part: string
  option: string
  price: number
}

export interface ProductCustomizations {
  selected_options: ProductCustomization[]
}