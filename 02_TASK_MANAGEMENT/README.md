# 📋 TaskFlow - Task Management Application

> **Thiranex Full Stack Development Internship – Project 2**  
> A functional, clean, and responsive Task Management Web Application built with **React.js, Node.js, Express.js, and MongoDB Atlas**.

---

## 🚀 Features

- **User Authentication**: Secure user registration & login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Task Creation**: Add tasks with title, description, category, priority (Low, Medium, High), and due dates.
- **Task Listing & Filtering**: Filter tasks by All, Pending, and Completed states with live counter badges.
- **Task Updating**: Edit existing task details smoothly.
- **Status Toggling**: Mark tasks as completed or pending with immediate MongoDB updates.
- **Task Deletion**: Remove tasks with confirmation.
- **MongoDB Atlas Integration**: Fully persisted in cloud MongoDB Atlas database.

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18, Vite, Lucide Icons, Pure CSS3
- **Backend**: Node.js, Express.js, RESTful API
- **Database**: MongoDB Atlas via Mongoose
- **Authentication**: JWT & bcryptjs

---

## 📁 Project Structure

```
02_TASK_MANAGEMENT/
├── backend/
│   ├── config/          # MongoDB Atlas connection
│   ├── controllers/     # Auth and Task business logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # User and Task Mongoose schemas
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
# Configure .env with your MONGO_URI, JWT_SECRET, and PORT=5002
npm start
```
The backend server runs on `http://localhost:5002`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start on `http://localhost:3001`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user & get JWT | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| GET | `/api/tasks` | Get all tasks for logged-in user | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update task details | Yes |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

---

## 👩‍💻 Author
**Mithradevi Rajalingam**  
B.E. Computer Science and Engineering  
Kongu Engineering College, Perundurai  
Thiranex Full Stack Web Development Internship
