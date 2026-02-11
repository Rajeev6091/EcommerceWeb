# 🛒 EcommerceWeb

A full-stack MERN Ecommerce application with separate User and Admin panels.  
Built with scalable architecture, secure authentication, and complete product management functionality.

---

## 🌐 Live Demo

### 👤 User Website
🔗 **Visit Here:**  
https://ecommerceweb-frontendone.onrender.com

### 🔐 Admin Dashboard
🔗 **Visit Here:**  
https://ecommerceweb-adminone.onrender.com

---

## 🚀 Features

### 👥 User Panel
- User Registration & Login (JWT Authentication)
- Browse Products
- Add to Cart
- Remove from Cart
- Checkout System
- Responsive Design

### 🛠 Admin Panel
- Secure Admin Login
- Add / Update / Delete Products
- Manage Inventory
- View & Manage Orders

---

## 🏗 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Deployment
- Frontend: Render
- Admin: Render
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

EcommerceWeb/
│
├── frontend/                     # User Application (React)
│   ├── public/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page-level components
│   │   ├── context/              # Global state (AuthContext, CartContext)
│   │   ├── services/             # API calls (Axios config)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── admin/                        # Admin Dashboard (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/             # Admin API calls
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/                      # Node + Express API
│   ├── config/                   # Database connection & configs
│   ├── controllers/              # Business logic
│   ├── models/                   # Mongoose schemas
│   ├── routes/                   # API routes
│   ├── middleware/               # Auth middleware
│   ├── server.js                 # Entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json (if root level exists)


---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

git clone https://github.com/your-username/EcommerceWeb.git
cd EcommerceWeb

---

### 2️⃣ Backend Setup

cd backend
npm install
Create a `.env` file inside backend folder:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
Start backend:  npm start


---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm start

---

### 4️⃣ Admin Setup

cd admin
npm install
npm start



---

## 🔐 Authentication Flow

- User logs in
- Server validates credentials
- JWT token generated
- Protected routes verified using middleware

---

## 📌 Future Enhancements

- Payment Gateway Integration (Razorpay)
- Product Reviews & Ratings
- Order Tracking System
- Role-Based Access Control
- Docker Deployment

---

## 👨‍💻 Author

Rajeev Singh  

---









