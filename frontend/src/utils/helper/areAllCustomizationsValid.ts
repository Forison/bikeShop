import { ProductCustomizations } from "../interface/customization";

export function areAllCustomizationsValid(customizations: ProductCustomizations | undefined): boolean {
  if (customizations === undefined) return false
  return customizations.selected_options.every(
    (item) => item.part.trim() !== '' && item.option.trim() !== ''
  )
}
