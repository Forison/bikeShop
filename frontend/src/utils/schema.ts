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
  first_name: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  date_of_birth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
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


export const categoryProductOptionSchema = Yup.object({
  category: Yup.object({
    name: Yup.string().required('Category name is required'),
    product_parts: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required('Part name is required'),
          part_options: Yup.array()
            .of(
              Yup.object({
                name: Yup.string().required('Part Option name is required'),
                price: Yup.number()
                  .required('Part option price is required')
                  .min(0, 'Price must be greater than or equal to 0'),
                quantity: Yup.number()
                  .required('Part option quantity is required')
                  .min(0, 'Quantity must be greater than or equal to 0'),
              })
            )
            .min(1, 'At least one part option is required'),
        })
      )
      .min(1, 'At least one product part is required'),
  })
})


export const productSchema = Yup.object({
  product: Yup.object({
    name: Yup.string().required('Product name is required'),
    category_id: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be greater than or equal to 1'),
  }),
  price_rule: Yup.object({
    part_option: Yup.array()
      .of(
        Yup.object({
          condition_key: Yup.string()
            .test(
              'condition-key-required',
              'Condition Key is required when Condition Value is provided',
              function (value) {
                return !!this.parent.condition_value ? !!value : true;
              }
            ),

          condition_value: Yup.string()
            .test(
              'condition-value-required',
              'Condition Value is required when Condition Key is provided',
              function (value) {
                return !!this.parent.condition_key ? !!value : true;
              }
            ),

          price_modifier: Yup.number()
            .when(['condition_key', 'condition_value'], {
              is: (key: any, value: any) => !!key && !!value,
              then: (schema) =>
                schema
                  .required('Price Modifier is required')
                  .min(0, 'Price Modifier must be greater than or equal to 0'),
              otherwise: (schema) => schema.notRequired(),
            }),
        })
      )
      .min(1, 'At least one part option condition is required'),
  }),
});
