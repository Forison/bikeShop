require 'open-uri'

user = Api::V1::User.create!(
  email: Faker::Internet.unique.email,
  password: 'password123',
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
        part: 'Frame type',
        part_options: [
          { part: 'Full-suspension', price: (n + 1) * 61.0, quantity: 5 },
          { part: 'diamond', price: 15.0, quantity: 3 },
          { part: 'step-through', price: 52.0, quantity: 3 }
        ]
      },
      {
        part: 'Frame finish',
        part_options: [
          { part: 'Matte', price: (n + 1) * 43.0, quantity: 5 },
          { part: 'shiny', price: 67.0, quantity: 3 }
        ]
      },
      {
        part: 'Wheels',
        part_options: [
          { part: 'Road wheels', price: (n + 1) * 98.0, quantity: 5 },
          { part: 'mountain wheels', price: 114.0, quantity: 3 },
          { part: 'fat bike wheels', price: 211.0, quantity: 3 }
        ]
      },
      {
        part: 'Rim color',
        part_options: [
          { part: 'blue', price: (n + 1) * 111.0, quantity: 5 },
          { part: 'black', price: 153.0, quantity: 3 },
          { part: 'Red', price: 155.0, quantity: 3 }
        ]
      },
      {
        part: 'Chain',
        part_options: [
          { part: '8-speed chain', price: (n + 1) * 10.0, quantity: 5 },
          { part: 'Single-speed chain', price: 15.0, quantity: 3 }
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

  product = Api::V1::Product.create!(
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
