# LMS - Learning Management System

A full-stack MERN application where users can enter as **Student** or **Teacher**. Students view courses; teachers manage courses (add, edit, delete).

## Features

- **Role Selection Modal** – On load, choose Student (direct access) or Teacher (password: `1234`)
- **Student** – View all courses, read details, open course links
- **Teacher** – Add, edit, delete courses with toast notifications
- **Responsive UI** – Card layout, Tailwind CSS, mobile-first

## Tech Stack

| Layer    | Tech                          |
| -------- | ----------------------------- |
| Frontend | React (Vite), React Router, Axios, Tailwind CSS |
| Backend  | Node.js, Express.js, REST APIs |
| Database | MongoDB Atlas, Mongoose       |

## Project Structure

```
LMS/
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/courseController.js
│   ├── models/Course.js
│   ├── routes/courseRoutes.js
│   ├── middleware/errorMiddleware.js
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/        # RoleModal, CourseCard, Navbar
│   │   ├── pages/             # Home, TeacherDashboard, NotFound
│   │   ├── services/api.js
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md
```

## MongoDB Schema

```javascript
Course {
  title: String (required)
  description: String (required)
  link: String (required)       // YouTube/Drive/URL
  teacherName: String (required)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## REST API Routes

| Method | Route        | Description    |
| ------ | ------------ | -------------- |
| GET    | /api/courses | Get all courses |
| POST   | /api/courses | Create course  |
| PUT    | /api/courses/:id | Update course |
| DELETE | /api/courses/:id | Delete course |

## Setup & Run

### 1. Clone & install

```bash
cd LMS
npm install --prefix backend
npm install --prefix frontend
```

### 2. Environment

Copy backend `.env.example` to `.env`:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
```

**Note:** Add your IP in MongoDB Atlas → Network Access → Add IP.

### 3. Run

**Backend:**
```bash
cd backend && npm run dev
```

**Frontend:**
```bash
cd frontend && npm run dev
```

- Backend: http://localhost:5000  
- Frontend: http://localhost:3000  

## UI Overview

- **Role Modal** – Centered popup, Student / Teacher buttons; Teacher asks for password (`1234`).
- **Navbar** – Shows role and “Switch Role”.
- **Home (Student)** – Course cards: title, short description, teacher, “View Course” button.
- **Teacher Dashboard** – Form to add course; list of courses with Edit/Delete per card.
- **Toast Notifications** – Success (green) and error (red) for CRUD actions.
