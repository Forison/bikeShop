require 'open-uri'

user = Api::V1::User.create!(
  email: 'admin@admin.com',
  password: '11111111',
  name: Faker::Name.name,
  role: :admin
)
bicycles = ['BMX Bike',
            'Road bikes',
            '3t',
            'Bianchi',
            'Cannondale',
            'Cargo bikes',
            'Hybrid bikes',
            'Mountain bike',
            'Colnago',
            'Folding bikes']

10.times do |n|
  product_params = {
    product_parts: [
      {
        name: 'Frame type',
        part_options: [
          { name: 'Full-suspension', price: (n + 1) * 61.0, quantity: 5 },
          { name: 'diamond', price: 15.0, quantity: 3 },
          { name: 'step-through', price: 52.0, quantity: 3 }
        ]
      },
      {
        name: 'Frame finish',
        part_options: [
          { name: 'Matte', price: (n + 1) * 43.0, quantity: 5 },
          { name: 'shiny', price: 67.0, quantity: 3 }
        ]
      },
      {
        name: 'Wheels',
        part_options: [
          { name: 'Road wheels', price: (n + 1) * 98.0, quantity: 5 },
          { name: 'mountain wheels', price: 114.0, quantity: 3 },
          { name: 'fat bike wheels', price: 211.0, quantity: 3 }
        ]
      },
      {
        name: 'Rim color',
        part_options: [
          { name: 'blue', price: (n + 1) * 111.0, quantity: 5 },
          { name: 'black', price: 153.0, quantity: 3 },
          { name: 'Red', price: 155.0, quantity: 3 }
        ]
      },
      {
        name: 'Chain',
        part_options: [
          { name: '8-speed chain', price: (n + 1) * 10.0, quantity: 5 },
          { name: 'Single-speed chain', price: 15.0, quantity: 3 }
        ]
      }

    ],
    price_rule: {
      part_option: [
        { condition_value: '8-speed chain', condition_key: 'Chain', price_modifier: (n + 1) * 5.0 }
      ]
    },
    combination_rule: {
      prohibited_options: [{ 'Wheels': 'fat bike wheels' }]
    }
  }

  product = Api::V1::Product.new(
    name: bicycles[n],
    user_id: user.id,
    description: Faker::Lorem.sentence,
    category: 'Bicycle',
    quantity: n * 3
  )

  product_creation_service = Api::V1::ProductCreationService.new(product, product_params)
  product_creation_service.call
end
puts 'Product created successfully with parts, price rules, and combination rules.'
