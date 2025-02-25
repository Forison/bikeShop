bicycles = ['BMX Bike', 'Road bikes', '3t', 'Bianchi', 'Cannondale', 'Cargo bikes', 'Hybrid bikes', 'Mountain bike',
            'Colnago', 'Folding bikes']

product_parts = [
  {
    name: 'Frame type',
    part_options: [
      { name: 'Full-suspension', price: 61.0 },
      { name: 'diamond', price: 15.0 },
      { name: 'step-through', price: 52.0 }
    ]
  },
  {
    name: 'Frame finish',
    part_options: [
      { name: 'Matte', price: 43.0 },
      { name: 'shiny', price: 67.0 }
    ]
  },
  {
    name: 'Wheels',
    part_options: [
      { name: 'Road wheels', price: 98.0 },
      { name: 'mountain wheels', price: 114.0 },
      { name: 'fat bike wheels', price: 211.0 }
    ]
  },
  {
    name: 'Rim color',
    part_options: [
      { name: 'blue', price: 111.0 },
      { name: 'black', price: 153.0 },
      { name: 'Red', price: 155.0 }
    ]
  },
  {
    name: 'Chain',
    part_options: [
      { name: '8-speed chain', price: 10.0 },
      { name: 'Single-speed chain', price: 15.0 }
    ]
  }
]

user = Api::V1::User.new(
  email: 'admin@admin.com',
  password: '11111111',
  last_name: Faker::Name.first_name,
  first_name: Faker::Name.first_name,
  date_of_birth: Faker::Date.birthday(min_age: 18, max_age: 65),
  role: :admin
)

user[:token] = Api::V1::JwtService.encode(user_id: user.id)
user.save!

category = Api::V1::Category.new(name: 'bicycle')

Api::V1::CreateCategoryService.new(product_parts, category).call

bicycles.each do |bicycle|
  product_params = {
    product: {
      name: bicycle, # Dynamic name
      category_id: category.id,
      user_id: user.id,
      description: "A durable #{bicycle.downcase} suitable for off-road trails.",
      quantity: 10,
      not_customizable: false
    },
    price_rule: [
      {
        part_option: [
          {
            condition_value: 'matte',
            condition_key: 'Frame finish',
            price_modifier: 30.0
          },
          {
            condition_value: 'full-suspension',
            condition_key: 'Frame type',
            price_modifier: 50.0
          }
        ]
      }
    ],
    combination_rule: [
      {
        product_id: 1,
        prohibited_options: [
          { part: 'Frame type', option: 'step-through' },
          { part: 'Wheels', option: 'fat bike wheels' }
        ]
      }
    ]
  }

  product = Api::V1::Product.new(product_params[:product])
  Api::V1::ProductCreationService.new(product, product_params).call
end

puts 'Products created successfully with parts, price rules, and combination rules.'
