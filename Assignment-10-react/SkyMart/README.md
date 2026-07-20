# 🛒 SkyMart - Modern E-Commerce Web Application

SkyMart is a modern e-commerce web application built using **React 19**, **Vite**, **Tailwind CSS v4**, **React Router v8**, and **Context API**. The application provides local authentication, persistent shopping carts for every user, protected routing, and a responsive shopping experience powered by the FakeStore API.

---

# 🚀 Features

- User Registration & Login
- Persistent Authentication using Local Storage
- Protected & Guest Routes
- Dynamic Product Catalog
- Shopping Cart bound to each user
- Quantity Management
- Search Ready Product Rendering
- Responsive UI
- Context API State Management
- Clean Component Architecture

---

# 🛠 Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- React Router v8
- React Hook Form
- Axios
- Lucide React
- Context API
- FakeStore API

---

# 📁 Folder Structure

```text
SkyMart/
├── src/
│
├── components/
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   └── CartCard.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── ProductContext.jsx
│   └── CartContext.jsx
│
├── layouts/
│   └── AppLayout.jsx
│
├── pages/
│   ├── Landing.jsx
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   └── auth/
│       ├── Login.jsx
│       └── Register.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   ├── GuestRoutes.jsx
│   └── ProtectedRoutes.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🏗 Application Architecture

```
BrowserRouter
        │
        ▼
 AuthProvider
        │
        ▼
ProductProvider
        │
        ▼
 CartProvider
        │
        ▼
      App
        │
        ▼
   React Router
        │
        ▼
─────────────────────────────
Guest Routes
─────────────────────────────
Landing
Login
Register

─────────────────────────────
Protected Routes
─────────────────────────────
Home
Products
Cart
```

---

# 🔐 Authentication

Authentication is handled through **AuthContext**.

Every registered user is stored using their email as the unique key.

```js
users = {
  "john@gmail.com": {
    name: "John",
    email: "john@gmail.com",
    password: "********",
    cart: {},
  },
};
```

Current logged in user

```js
currentUser = {
  name,
  email,
  password,
  cart,
};
```

All authentication data is automatically synchronized with **Local Storage**.

---

# 🛍 Product Management

Products are fetched once from the FakeStore API and stored globally using **ProductContext**.

```js
products = [
  {
    id,
    title,
    price,
    description,
    image,
    category,
    rating,
  },
];
```

This avoids unnecessary API requests throughout the application.

---

# 🛒 Cart Management

Every user owns an independent shopping cart.

Instead of storing only product IDs, the complete product object is stored together with its quantity.

```js
cart = {
  1: {
    ...product,
    quantity: 2,
  },

  5: {
    ...product,
    quantity: 1,
  },
};
```

This allows the application to

- instantly render cart items
- avoid repeated API lookups
- calculate totals efficiently
- check whether a product already exists in the cart in O(1)

---

# 📦 Cart Operations

The CartContext provides the following methods.

### Add Product

```js
addToCart(product);
```

- Adds product if not present
- Otherwise increments quantity

---

### Remove Product

```js
removeFromCart(id);
```

Deletes a product completely from the cart.

---

### Increase Quantity

```js
increaseQuantity(id);
```

Adds one quantity.

---

### Decrease Quantity

```js
decreaseQuantity(id);
```

Removes one quantity.

If quantity becomes zero, the product is removed.

---

### Clear Cart

```js
clearCart();
```

Removes every product from the cart.

---

# 📄 Pages

## Landing

Public landing page introducing SkyMart.

---

## Register

Creates a new account with validation.

---

## Login

Authenticates existing users.

---

## Home

Dashboard shown after login.

---

## Products

Displays every product fetched from FakeStore API.

Features

- Responsive Grid
- Search Ready Rendering
- Add to Cart
- Go To Cart when already added

---

## Cart

Displays

- Cart Items
- Quantity Controls
- Remove Item
- Dynamic Order Summary

Calculates

- Subtotal
- Shipping
- Discount
- Total

---

# 🎨 Components

## Header

Shared navigation component.

Contains

- Logo
- Navigation Links
- Cart Link
- User Actions

---

## ProductCard

Displays

- Image
- Category
- Rating
- Description
- Price
- Add to Cart / Go To Cart

---

## CartCard

Displays

- Product Image
- Details
- Quantity Controls
- Remove Button
- Total Price

---

# 🔒 Route Protection

Guest Routes

```
/
login
register
```

Accessible only when logged out.

---

Protected Routes

```
home
products
cart
```

Accessible only after login.

---

# 💾 Local Storage

The following keys are stored locally.

```text
users
currentUser
```

This keeps authentication and cart data persistent after refreshing the browser.

---

# ▶ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Create production build

```bash
npm run build
```

---

# 🌐 API

Product data is fetched from

```
https://fakestoreapi.com/products
```

---

# 📸 Screenshots

Add screenshots of

- Landing Page
- Login
- Register
- Products
- Cart

---

# 📌 Future Improvements

- Product Details Page
- Category Filters
- Sorting
- Search Functionality
- Wishlist
- Checkout Flow
- Order History
- Toast Notifications
- Dark Mode
- Backend Integration
- Payment Gateway

---

# 👨‍💻 Author

**Atharv Agrey**

Built as a frontend e-commerce application to practice React, Context API, React Router, Tailwind CSS, and state management.
