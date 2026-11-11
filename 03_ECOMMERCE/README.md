# 🛒 ShopQuick - E-Commerce Web Application

> **Thiranex Full Stack Development Internship – Project 3**  
> A functional, clean, and responsive E-Commerce Web Application built with **React.js, Node.js, Express.js, and MongoDB Atlas**.

---

## 🚀 Features

- **Product Listing & Filtering**: Browse catalog items with category filters (Audio, Accessories, Wearables).
- **Product Details View**: View detailed specifications, ratings, real-time stock levels, and product images in a dedicated modal.
- **Cart Management**: Add products to cart, increment/decrement quantities, remove items, and see instant price calculations.
- **Persistent Cart**: Cart persists locally in localStorage across browser sessions.
- **Checkout Flow**: Complete order placement with customer name, email, phone, and delivery address.
- **Cash on Delivery (COD)**: Functional demo checkout without fake third-party gateway dependencies.
- **Order Placement**: Real-time order creation and storage in MongoDB Atlas with generated unique Order IDs.
- **Automatic Seed**: Automatically populates sample products into MongoDB Atlas on startup if empty.

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18, Vite, Lucide Icons, Pure CSS3
- **Backend**: Node.js, Express.js, RESTful API
- **Database**: MongoDB Atlas via Mongoose

---

## 📁 Project Structure

```
03_ECOMMERCE/
├── backend/
│   ├── config/          # MongoDB Atlas connection
│   ├── controllers/     # Product and Order controllers
│   ├── data/            # Sample seed products
│   ├── models/          # Product and Order Mongoose schemas
│   ├── routes/          # Product and Order route endpoints
│   ├── .env.example     # Environment template
│   ├── package.json     # Backend dependencies
│   └── server.js        # Express application entry
├── frontend/
│   ├── src/             # React application components and styling
│   ├── index.html       # HTML entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
├── .gitignore
└── README.md
```

---

## ⚙️ Setup and Running Locally

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with your MONGO_URI and PORT=5003
npm start
```
The backend server runs on `http://localhost:5003`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start on `http://localhost:3002`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/:id` | Fetch single product by ID |
| POST | `/api/orders` | Place a new order with items & customer details |
| GET | `/api/orders` | View placed orders |
| GET | `/api/orders/:id` | Get single order confirmation details |

---

## 👩‍💻 Author
**Mithradevi Rajalingam**  
B.E. Computer Science and Engineering  
Kongu Engineering College, Perundurai  
Thiranex Full Stack Web Development Internship
