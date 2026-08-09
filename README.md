# 🧭 Career Compass — Production-Ready Full-Stack Career Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-username/career-compass)
[![Stack](https://img.shields.io/badge/stack-MERN-blue)](https://mongodb.com)
[![License](https://img.shields.io/badge/license-MIT-purple)](#license)

> **Career Compass** is an end-to-end career guidance platform designed to empower students and working professionals to explore high-demand careers, follow step-by-step learning roadmaps, compare industry options side-by-side, access curated learning resources, and track milestone progress in real-time.

---

## 🌟 Key Modules & Features

### 1. 🔐 Authentication Module
- **Registration & Login**: Full JWT authentication using `bcryptjs` password hashing.
- **Email OTP Verification**: 6-digit OTP generation, Nodemailer HTML email delivery, and dev console fallback.
- **Password Recovery**: Secure Forgot Password & Reset Password flow via OTP validation.
- **Protected Routes**: React Router v6 route guards protecting user dashboards.

### 2. 🎯 Education & Stage Selection Module
- Interactive stage selection across 6 pathways: **Class 8-10**, **Intermediate (11-12)**, **Diploma**, **B.Tech / Degree**, **Working Professional**, and **Other**.
- State persistence across `localStorage`, `AuthContext`, and MongoDB sync for authenticated users.

### 3. 🔍 Career Explorer & Details Module
- **Live Search & Category Filtering**: Filter across Technology, Medicine, Commerce, Law, Design, Agriculture, Civil Services, and Defence.
- **Comprehensive Career Matrix**: View Overview, Starting Salary, Market Demand, Required Education, Essential Skills, Top Hiring Companies, and Long-Term Future Scope.

### 4. 🗺️ Roadmap & Progress Tracking Module
- **Step Details Modal**: Every timeline step displays **Description**, **Core Subjects**, **Recommended Video Lectures**, **Free Web Resources**, **Expert Pro-Tips**, and **Reference Books**.
- **MongoDB Real-time Sync**: Completing a step triggers `POST /api/progress/step`, saving progress per user.
- **Auto-Advancing Timeline**: "Complete Step & Continue" button recalculates progress percentage dynamically and automatically opens the next step.

### 5. 📚 Learning Resources Module
- Categorized learning hub across **Books**, **Courses**, **YouTube Channels**, **Websites**, and **Developer Tools**.
- **MongoDB Bookmarks**: Save resources to user profile bookmarks with single-click persistence.

### 6. ⚖️ Compare Careers Module
- Side-by-side matrix comparing two careers (Career A vs Career B) across **Salaries**, **Demand**, **Skills**, **Required Degrees**, and **Best Match**.

### 7. 📊 User Dashboard Module
- Tabbed dashboard: **Overview** (Continue Journey, Recent Activity, Progress & Achievements), **Profile & Security** (Update Name/Email, Avatar Picker, Change Password), **Saved Bookmarks**, and **Settings**.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React (Vite), React Router v6, React Hook Form, Axios, Vanilla CSS (Glassmorphism & CSS Tokens) |
| **Backend** | Node.js, Express.js, Mongoose ODM, JSON Web Tokens (JWT), Nodemailer, Bcrypt.js |
| **Security & Middleware** | Helmet, Express Rate Limit, Compression, CORS, Express-Validator |
| **Database** | MongoDB / MongoDB Atlas |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database Cloud) |

---

## 📁 Directory Architecture

```
career-compass/
├── client/                     # Frontend Vite React App
│   ├── public/                 # Static Assets & Icons
│   ├── src/
│   │   ├── components/         # Reusable Components (Navbar, Footer, SkeletonLoader, Toast)
│   │   ├── context/            # AuthContext API & Global State
│   │   ├── layouts/            # Main Layout Wrappers
│   │   ├── pages/              # Landing, Explorer, Details, Roadmap, Resources, Compare, Dashboard, Auth
│   │   ├── routes/             # AppRoutes & ProtectedRoute Guard
│   │   ├── services/           # Axios API Interceptors & Service Calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json             # Vercel Deployment SPA Configuration
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend Express REST API
│   ├── config/                 # Database Connection Setup (db.js)
│   ├── controllers/            # Auth, Career, Progress, Resource, Bookmark Controllers
│   ├── middleware/             # JWT Auth Middleware & Input Validation
│   ├── models/                 # Mongoose Schemas (User, OTP, Career, Progress, Resource, Bookmark)
│   ├── routes/                 # Express API Route Definition Files
│   ├── server.js               # Express Server Entry Point
│   ├── .env.example            # Environment Variable Template
│   └── package.json
│
└── README.md                   # Complete Documentation
```

---

## 🚀 Local Installation & Setup Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Local MongoDB server or MongoDB Atlas URI string

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/career-compass.git
cd career-compass
```

### Step 2: Setup Backend (`server`)
```bash
# Navigate to server folder
cd server

# Install backend dependencies
npm install

# Create environment configuration file
cp .env.example .env
```

Edit your `server/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/career_compass
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

Start backend development server:
```bash
npm run dev
```

### Step 3: Setup Frontend (`client`)
Open a new terminal window:
```bash
# Navigate to client folder
cd client

# Install frontend dependencies
npm install

# Start Vite dev server
npm run dev
```

Visit application in browser: `http://localhost:5173`

---

## 🌐 Production Deployment Guide

### 1. MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist all IP addresses (`0.0.0.0/0`).
3. Copy the Connection URI string:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/career_compass?retryWrites=true&w=majority`

### 2. Backend Deployment on Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and select the `server` directory.
3. Configure Build & Start commands:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables in Render Dashboard:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `<Your MongoDB Atlas URI>`
   - `JWT_SECRET`: `<Your Production Secret>`
   - `CLIENT_URL`: `https://your-app.vercel.app`

### 3. Frontend Deployment on Vercel
1. Import your project into [Vercel](https://vercel.com).
2. Set Root Directory to `client`.
3. Framework Preset: **Vite**.
4. The included `client/vercel.json` ensures SPA client-side routing works smoothly without 404 errors on refresh.

---

## 🧪 Testing & API Documentation

### REST API Endpoints

#### Authentication (`/api/auth`)
- `POST /api/auth/register` — User Signup
- `POST /api/auth/login` — User Login & JWT issuance
- `POST /api/auth/send-otp` — Generate & send email OTP
- `POST /api/auth/verify-otp` — Verify OTP & activate account
- `POST /api/auth/forgot-password` — Request password reset OTP
- `POST /api/auth/reset-password` — Reset password with OTP
- `GET /api/auth/profile` — Get authenticated user details (Protected)
- `PUT /api/auth/profile` — Update user profile & avatar (Protected)
- `PUT /api/auth/change-password` — Change user password (Protected)
- `GET /api/auth/dashboard-stats` — Get user stats & achievements

#### Career Explorer (`/api/careers`)
- `GET /api/careers` — List all careers (supports `?category=`, `?search=`, `?education=`)
- `GET /api/careers/:id` — Get single career by ID or Slug

#### Progress Tracking (`/api/progress`)
- `GET /api/progress/:careerId` — Get user progress for a career
- `POST /api/progress/step` — Update step completion status in MongoDB

#### Learning Resources (`/api/resources`)
- `GET /api/resources` — List resources (supports `?type=`, `?search=`)

#### Bookmarks (`/api/bookmarks`)
- `GET /api/bookmarks` — List user saved bookmarks
- `POST /api/bookmarks/toggle` — Add/remove bookmark in MongoDB

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
#   C a r e e r C o m p a s s  
 