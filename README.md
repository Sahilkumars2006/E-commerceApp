# E-CommerceApp

A modern, full-featured e-commerce application built with **React**, **Vite**, **TypeScript**, **Express**, **Supabase (PostgreSQL)**, and **Tailwind CSS**. This application provides a complete online shopping experience with user authentication, product catalog, shopping cart, and more.

## 🚀 Features

### Customer Features
- **User Authentication**: Sign up, login, and logout functionality
- **Product Catalog**: Browse products with categories, search, and filters
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: (Ready for integration with payment gateways)
- **Order Management**: View order history and track order status
- **User Profile**: Manage personal information and addresses
- **Wishlist**: (Planned)
- **Product Reviews**: (Planned)

### Admin Features
- **Dashboard**: Overview of sales, orders, and inventory
- **Product Management**: Add, edit, and delete products
- **Category Management**: Organize products into categories
- **Order Management**: Process and update order status
- **User Management**: View and manage customer accounts
- **Analytics**: (Planned)

## 🛠️ Technology Stack

### Frontend
- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Fetch API

### Backend
- **Framework**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Session-based (with Supabase)
- **Payment Processing**: (Ready for Stripe integration)

### Additional Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Deployment**: (Ready for Vercel/Netlify/Heroku/Docker)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)
- [Supabase](https://supabase.com/) account (for database)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahilkumars2006/ProfessionalDesignStudio.git
   cd ProfessionalDesignStudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   DATABASE_URL=your_supabase_postgres_connection_string
   ```

4. **Set up the database**
   - Use the provided SQL in `/shared/schema.ts` or the README to create tables in your Supabase/Postgres database.

5. **Start the backend**
   ```bash
   npm run dev
   ```

6. **Start the frontend**
   Open a new terminal:
   ```bash
   cd client
   npm run dev
   ```

- Frontend: http://localhost:5173
- Backend/API: http://localhost:5000

## 🚦 Usage

1. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

2. **Customer Journey**
   - Sign up for a new account or login with existing credentials
   - Browse products and add items to your cart
   - Proceed to checkout (payment integration coming soon)
   - Track your order status in the user dashboard

3. **Admin Features**
   - Login with admin credentials
   - Manage products, categories, and orders
   - View analytics and generate reports (planned)

## 📁 Project Structure

```
ProfessionalDesignStudio/
├── client/                 # React frontend (Vite, TypeScript, Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── index.css       # Global styles
│   └── package.json
├── server/                 # Express backend (TypeScript)
│   ├── db.ts               # Database connection
│   ├── routes.ts           # API routes
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schema
│   └── schema.ts
├── .env                    # Environment variables (not committed)
├── README.md
```

## 🔐 API Endpoints (Examples)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status (Admin)

## 🧪 Testing

Run the test suite (if available):
```bash
npm test
```

## 🚀 Deployment

- Ready for deployment on Vercel, Netlify, Heroku, or Docker.
- Set environment variables on your deployment platform as needed.
## Demo
<a href="https://ibb.co/cXtpXKSV"><img src="https://i.ibb.co/2YPLY01H/Shop-Craft-App.png" alt="Shop-Craft-App" border="0"></a>


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sahil Kumar**

## 🙏 Acknowledgments
- Special thanks to the open-source community 
