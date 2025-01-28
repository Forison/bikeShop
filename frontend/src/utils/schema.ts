import * as Yup from 'yup'

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})


export const registrationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
})

export const productSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required'),
  category: Yup.string()
    .required('Category is required'),
  description: Yup.string(),
  base_price: Yup.number()
    .typeError('Base price must be a number')
    .positive('Base price must be positive')
    .max(9999999999, 'Base price exceeds maximum allowed value')
    .required('Base price is required'),
  images: Yup.array()
    .of(Yup.mixed().required("Image is required"))
    .max(3, "You can upload up to 3 images")
    .required("At least one image is required"),
})

export const productPartSchema = Yup.object({
  part: Yup.string()
    .required('Product part is required'),
  partOption: Yup.string()
    .required('Part option is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
})

export const priceRuleSchema = Yup.object({
  conditionKey: Yup.string()
    .required('condition key is required'),
  conditionValue: Yup.string()
    .required('condition value is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
})


export const combinedValidationSchema = Yup.object({
  product: Yup.object({
    name: Yup.string().required('Product name is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    basePrice: Yup.number().required('Base Price is required').min(0, 'Base Price must be greater than or equal to 0')
  }),

  productPart: Yup.object({
    part: Yup.string().required('Part is required'),
    partOptions: Yup.array()
      .of(
        Yup.object({
          partOption: Yup.string().required('Part Option is required'),
          price: Yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
        })
      )
      .min(1, 'At least one part option is required')
  }),

  priceRule: Yup.object({
    partOption: Yup.array()
      .of(
        Yup.object({
          conditionKey: Yup.string().required('Condition Key is required'),
          conditionValue: Yup.string().required('Condition Value is required'),
          priceModifier: Yup.number().required('Price Modifier is required').min(0, 'Price Modifier must be greater than or equal to 0'),
        })
      )
      .min(1, 'At least one part option condition is required')
  }),

  combinationRule: Yup.object({
    prohibitedOptions: Yup.array()
      .of(
        Yup.object({
          part: Yup.string().required('Product part is required'),
          option: Yup.string().required('Product option is required')
        })
      )
      .min(1, 'At least one prohibited option is required')
  }),
})

