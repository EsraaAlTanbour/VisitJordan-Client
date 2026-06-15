# 🇯🇴 VisitJordan

A full-stack tourism platform that helps users discover Jordanian cities, destinations, blogs, and unique local experiences. The platform also supports local businesses by allowing approved experience providers to publish and manage tourism experiences.

---

## 📖 Description

VisitJordan allows users to explore tourism attractions across Jordan, view detailed information about experiences, make bookings, and interact with local tourism providers.

The platform consists of three main roles:

- 👤 User
- 🏢 Experience Provider
- 👨‍💼 Admin

Data is persisted in PostgreSQL and accessed through a Node.js/Express backend API.

---

## 👥 User Requirements

### 👤 User

- Register and log in.
- Browse cities, destinations, blogs, and experiences.
- View complete experience details.
- Make bookings.
- Like experiences.
- View profile information.
- Apply to become an experience provider.

### 🏢 Experience Provider

- Submit new experiences.
- Manage submitted experiences.
- Edit or delete unapproved experiences.
- View experience approval status.
- View bookings made for their experiences.

### 👨‍💼 Administrator

- Approve or reject provider requests.
- Approve or reject submitted experiences.
- Manage cities.
- Manage destinations.
- Manage blogs.
- Manage users.

---

## ⚙️ System Requirements

- Full-stack web application architecture.
- React.js frontend.
- Node.js and Express backend.
- PostgreSQL database.
- RESTful API communication.
- Authentication and authorization.
- Role-based access control.
- Input validation.
- Responsive design.
- Error handling and validation messages.
- Secure data storage.
- Separation between frontend, backend, and database layers.

---

## 🛠 Technologies

### Frontend

- React.js
- React Router DOM
- Axios
- CSS
- Vite
- LocalStorage

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database

- PostgreSQL

---

## 📄 Main Pages

- Home
- Cities
- City Details
- Destinations
- Destination Details
- Blogs
- Experiences
- Experience Details
- Login
- Register
- Profile
- Provider Dashboard
- Admin Dashboard

---

## ✨ Features

- User authentication.
- Experience booking.
- Like experiences.
- Provider applications.
- Experience approval workflow.
- Blog management.
- Destination management.
- City management.
- Responsive user interface.
- Role-based dashboards.

---

## 🔄 Request Flow

User → React Frontend → Express API → PostgreSQL Database → Express API → React Frontend → User

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

The application will run on:

```text
http://localhost:5173
```

---

## 👨‍💻 Developed Using

- React + Vite
- Node.js + Express
- PostgreSQL