# 📝 DevJournal - Blog Platform with Comments

> **Thiranex Full Stack Development Internship – Project 4**  
> A functional, clean, and responsive Blog Platform with Comments built with **React.js, Node.js, Express.js, and MongoDB Atlas**.

---

## 🚀 Features

- **User Authentication**: Secure user registration & login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Blog Publishing**: Authenticated users can write and publish rich blog articles with categories.
- **Article Reading**: Responsive blog feed and dedicated reader modal for immersive reading.
- **Article Editing & Deletion**: Authors can edit or delete their own posts.
- **Interactive Comment System**: Readers can post comments on any article with immediate timestamp and author attribution.
- **MongoDB Atlas Integration**: Fully persisted posts, users, and comments stored in cloud MongoDB Atlas database.
- **Automatic Seed**: Automatically provides sample engineering blog posts on startup if the database is empty.

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18, Vite, Lucide Icons, Pure CSS3
- **Backend**: Node.js, Express.js, RESTful API
- **Database**: MongoDB Atlas via Mongoose
- **Authentication**: JWT & bcryptjs

---

## 📁 Project Structure

```
04_BLOG_PLATFORM/
├── backend/
│   ├── config/          # MongoDB Atlas connection
│   ├── controllers/     # Auth and Post/Comment logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # User, Post, Comment Mongoose schemas
│   ├── routes/          # Express API route endpoints
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
# Configure .env with your MONGO_URI, JWT_SECRET, and PORT=5004
npm start
```
The backend server runs on `http://localhost:5004`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start on `http://localhost:3003`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user & get JWT | No |
| GET | `/api/posts` | Get all blog posts with comment count | No |
| GET | `/api/posts/:id` | Get single post with all comments | No |
| POST | `/api/posts` | Create a new blog post | Yes |
| PUT | `/api/posts/:id` | Edit post (author only) | Yes |
| DELETE | `/api/posts/:id` | Delete post (author only) | Yes |
| POST | `/api/posts/:id/comments` | Add comment to post | No / Optional Auth |

---

## 👩‍💻 Author
**Mithradevi Rajalingam**  
B.E. Computer Science and Engineering  
Kongu Engineering College, Perundurai  
Thiranex Full Stack Web Development Internship
