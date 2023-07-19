This project was based on an online bookstore Fahasa (fahasa.com)

## 1. Demo link
- Customer: https://fullstack-frontend-fahasa-clone.vercel.app/home
- Admin: https://fullstack-frontend-fahasa-clone.vercel.app/login (username: admin@gmail.com - password: admin)

## 2. Project description
- All of UI/UX and APIs was designed by myself
- List of completed functions
    - Customer: sign up/sign in/forget password (updating password must have a key that sent to customer's email), sign out (view will redirect to homepage whether at some specific pages), sort products by categories, view product details, add product to cart/delete product in cart/ change product's quantity, make an order, view order details, cancel order, reorder, change language, update customer's information
    - Admin: manage categories/orders/users, manage products and other values that relate to product (such as discount, tag)
- Technologies
    - Frontend: ReactJS, Redux, SCSS, Bootstrap, Axios
    - Backend: NodeJS (Express Framework), RESTful API
    - Database: PostgreSQL
    - Cache: Redis

## 3. How to run in localhost
- In the project directory, open Command line and run the below command to install dependencies:
### `npm install`
- Then, run this command to start the app
### `npm start`

-The app will run in the development mode.  To view it in the browser, access these links
    - Customer:  [http://localhost:3000](http://localhost:3000) or  [http://localhost:3000/home](http://localhost:3000/home)
    -  Admin:  [http://localhost:3000/login](http://localhost:3000/login) (username: admin@gmail.com - password: admin)