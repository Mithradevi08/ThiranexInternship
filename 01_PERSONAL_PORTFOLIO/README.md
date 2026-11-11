# 🌸 Mithradevi Rajalingam - Personal Portfolio Website

> **Thiranex Full Stack Development Internship – Project 1**  
> An enterprise-grade, modern personal portfolio website built with **React.js, Node.js, Express.js, and MongoDB**. Designed with a sophisticated pink-and-white theme, subtle gradients, responsive layout, animated skill bars, interactive project showcases, and a working contact API.

---

## 👩‍💻 About Mithradevi Rajalingam
- **Full Name**: Mithradevi Rajalingam
- **Display Name**: Mithradevi R
- **Professional Title**: Aspiring Software Engineer
- **Institution**: Kongu Engineering College, Perundurai (B.E. CSE, CGPA: 8.63)
- **Career Objective**: Aspiring Software Engineer interested in Full Stack Development, Java Programming, Data Structures & Algorithms, and Artificial Intelligence.

---

## 🚀 Key Features

1. **Modern Pink & White Aesthetic**: Elegant gradients, glassmorphic cards, crisp typography, and mobile-first responsiveness without jarring loading screens.
2. **Animated Skill Bars**: Smooth competency indicators displaying mastery levels (Advanced, Proficient, Intermediate) without raw numbers.
3. **Interactive Project Showcase**:
   - *ShopEasy* – Full Stack MERN E-Commerce App
   - *Sarcasm Detection Using Machine Learning* – TF-IDF & BiLSTM
   - *Capacity Connect* – Digital Learning Management Portal
   - *AI-Powered IoT System for Paddy Field Protection*
   - Each project includes a **"View Details" Modal** featuring problem statements, solutions, technical architecture, and key features.
4. **Interactive Certificate Gallery**:
   - IBM AI Fundamentals
   - Infosys Springboard – C++ Software Development
   - NPTEL – Computer Vision
   - IBM AI/ML Learning Credentials
   - Verification links and detailed curriculum breakdown modal.
5. **Interactive Resume Modal**:
   - Clean, professional CV format with instant **Print / Save as PDF** support.
6. **Full-Stack Contact Form**:
   - Connected to backend API (`POST /api/contact`) with MongoDB Atlas storage and real-time validation.

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18, Vite, Lucide Icons, CSS3 (Modern Flexbox/Grid, Custom Properties)
- **Backend**: Node.js, Express.js, RESTful Architecture
- **Database**: MongoDB Atlas via Mongoose (with active in-memory store fallback)
- **Deployment Ready**: Vercel (Frontend) & Render (Backend)

---

## 📁 Project Structure

```
01_PERSONAL_PORTFOLIO/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── models/
│   │   └── ContactMessage.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── CertModal.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ResumeModal.jsx
│   │   │   └── Skills.jsx
│   │   ├── data/
│   │   │   └── portfolioData.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup & Running Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Backend Setup
```bash
cd backend
npm install
# Start backend server on port 5001
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
# Start Vite development server on port 3000
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

---

## 🗄️ MongoDB Atlas Configuration

In `backend/.env`:
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
```
*Note: If no connection string is provided, the backend seamlessly runs with an in-memory storage fallback so you can test all features right away.*

---

## 🌐 Deployment Instructions

- **Frontend on Vercel**:
  1. Push code to GitHub.
  2. Import `01_PERSONAL_PORTFOLIO/frontend` into Vercel.
  3. Set framework preset to `Vite`.
  4. Deploy!
- **Backend on Render**:
  1. Create a new Web Service pointing to `01_PERSONAL_PORTFOLIO/backend`.
  2. Set Build Command to `npm install` and Start Command to `node server.js`.
  3. Add `MONGO_URI` and `PORT` environment variables.
