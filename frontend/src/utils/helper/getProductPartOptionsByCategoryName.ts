import { CategoryWithOptions } from '../interface/category'
import { ProductPart, ProductPartOption } from '../interface/shop'

export const getProductPartOptionsByCategoryName = (array: CategoryWithOptions[], id: number)
  : {
    parts: any,
    part_options: ProductPartOption[]
  } => {
  const category = array.find((category) => category.id == id)

  if (!category) return { parts: [], part_options: [] }
  const parts = category.parts_with_options.map(part => ({ name: part.name }))
  const part_options = category.parts_with_options.flatMap(part => part.part_options)

  return { parts, part_options }
}
