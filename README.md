# A website for bicycle shop and beyond

In this project I built a website for a bicycle shop, the site is scaled to also handle the sale of other items like:
skis, surfboards, roller skates, or other related sport items.

# Technologies

- React
- TypeScript
- Scss
- Ruby on Rails
- postgresql

# Features

- Register
- Login
- Product page
- Add to cart action
- New product creation
- Adding a new part choice
- Setting prices

# Workflows

This project has two main workflows, one for user with role admin, and the other for any customer who visits the page.
Per the requirement, the Owner of the site, Marcus would be perform administrative duties, and these duties include managing the website by adding adding and removing products
from the website.
The addition of products to the website follows 4 steps, namely: Adding the product details, adding the various part of the website, adding the options available for each part,
Adding a price rule for dynamic pricing, adding a combination rule for restricted or prohibited combinations. 
Each of the steps mentioned are each capture by a unique entities, thus, ensuring flexibility and modularity. The details of the entities would be outlined in the data models
section.
The Admin can also remove product he no longer want based on his own discretion.
Customer on the other hand can browse to product, customize if the want and add their product of choice to their cart.

# Main user actions

Admin: Create product, add part, add part options, set price rule, set combination rule and remove product from website.
Each product has a base price, which is determine by the part options specify by the admin, currently the price of each part sum up to the base price of the product.
Each product have their own price rule to enable dynamic pricing as specify in the requirement, this also set by admin at the creation of the product.
Each product have their own part combination rule, which determine which combinations are valid or otherwise.

Customer: Browse through product, customize product and add product to cart by clicking add to cart button.
The price of a product is based on the customization of made by the customer. The customer may also add a product to their cart without customization.
User can then view all the products added to their cart, by clicking the dropdown menu in the profile image or name.
User can also remove specific product from their cart.

# Product Page
This page is based on my own imagination. The product page display all the products created by the admin. Since this is a demo, some of the products are generated from seeding.

# Add to cart action
User may customize a product and click on the "Add to cart" button to add cart or may not customize at all before adding to cart.

# How to start the application

clone the application to your local machine.

`
git clone git@github.com:Forison/bikeShop.git
`

The application is made up of two directory(parts) the backend and the frontend.
Open two tabs in your terminal, one tab should point to the backend and the other to frontend

Tab 1(frontend)
`
cd frontend
`

install the dependencies by running

`
yarn install
`

Make sure you have a .env file inside the frontend dir
Add
`
REACT_APP_BACK_END_API_URL=http://localhost:{port_number}
`

then start the frontend by running

`
yarn start
`


Tab 2(backend)
`
cd backend
`
install the dependencies by running

`
bundle or bundle install
`
create the database 

`
rails db:create
`

Add migration by running

`
rails db:migrate
`

now start the backend by running

`
rails s --port={port_number}
`
Also run the test by running the command

`
rails test
`
# Model Section

![Data Model](erd.png)

Trade Offs

Overall, I was uncertain about the level of detail required to fully implement the solution due to some ambiguities in the problem statement. In a real-world project, I would have sought clarification on these areas to ensure alignment. I selected a tech stack I am proficient in, which also aligns with the job description. Initially, I considered using a design from Behance for the UI, but it would have taken too much time, so I relied on my own intuition instead.

Determining the base price of the product was challenging, as the description was unclear on this point. The product options were defined based on an ideal case where each product has options for all its parts, which seemed reasonable at the time. However, in a real-world scenario, collaborating with a product manager would have provided much-needed clarity and saved development time.

Technically, the following trade-offs were made:

1. Database Design (Relational vs. NoSQL)
Trade-off: I chose a relational database (PostgreSQL) to model the relationships between products, parts, and pricing. A NoSQL database like MongoDB could provide more flexibility in handling nested product configurations, but it would make querying stock availability and enforcing constraints (e.g., prohibited combinations) more complex.
This was also easy decision because Factorial alreaady uses PSQL.

2. Pricing Calculation (Precomputed vs. Dynamic)
Trade-off: I opted for dynamic pricing calculations instead of precomputing all possible price variations. Although this can impact the server, it makes it more flexible for the admin.

3. API Design (Monolith vs. Microservices)
Trade-off: I built a Microservice API to keep development scalable. A microservices approach would allow independent scaling of inventory, pricing, and orders. This is was too be inline with Factorial architechture

4. Frontend-Backend Communication (REST vs. GraphQL)
Trade-off: I used REST APIs for simplicity and ease of integration. GraphQL could have optimized data fetching by reducing over-fetching/under-fetching, but it requires additional client-side handling. This was a tough decision because Factorial uses both paradigms so I had to settle for simplicity.

5. UI Implementation (Server-side Rendering vs. Client-side Rendering)
Trade-off: I chose client-side rendering (React) to improve interactivity, especially for product customization and creation. However, server-side rendering (SSR) could have enhanced SEO and faster initial loads but this is just a test project not a real one.

5. Validation of Prohibited Combinations (Database vs. Business Logic Layer)
Trade-off: I handled invalid part combinations at the business logic level instead of enforcing them in the database. This makes rules easier to update but requires additional validation in the backend before processing an order. Initially I also have a stock validation which required users to select options that are related to specific parts. But the price rule require defeats that.

6. Product Customization Logic (Hardcoded vs. Configurable Rules)
Trade-off: I implemented configurable business rules so Marcus can define prohibited combinations dynamically. A simpler but less scalable alternative would have been hardcoding these rules in the code. Hardcoding would require the developer assistance for changes and would have offered marcus less flexiblity.

7. Stock availability
Trade-off: I had to manually display the number of product available for each product. there was not clear way in the requirement as to how the stock would diminish since the flow reaches cart. An item in cart is not technically sold hence it's still avalaible.

8. Image Upload
Trade-off: Images used in the application are all static images, image uploads wasn't part of the requirement, so in other for me to be faster in delivering a solution which focuses on the requirement mainly within the specified time was key. Image uploads for users and products would have made the site much cooler, but would have given extra task for tester and developer.

It was a nice task and I wish it became a real project there are many amelioration we could here. There are more room for refactory and optimization but i gues my time is up, if given the opportunity those could be done as well.
