# PrimeTrade Backend Developer Assignment

## Overview
A full-stack RBAC task management system built for the Backend Developer assignment.

This project demonstrates secure authentication, role-based access control, admin task assignment, and full CRUD operations in a production-style full-stack setup.

---

## Features
- User registration and login with JWT authentication
- Password hashing using bcrypt
- Role-based access control with `admin` and `user`
- Admin can assign tasks to specific users
- Admin can view, update, and delete all tasks
- Users can only view, update, and delete their own tasks
- Full CRUD operations for tasks
- Input validation and centralized error handling
- Swagger API documentation
- React + Tailwind frontend for demonstration

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- Swagger

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

---

## Folder Structure

```text
prime-backend-assignment/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── docs/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── utils/
│   │   └── validators/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
|   |   |__ App.jsx
|   |   |
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── scalability-note.md
│   └── PrimeTrade-Assignment-Postman-Collection.json
│
└── README.md