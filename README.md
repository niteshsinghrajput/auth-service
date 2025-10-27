# 🔐 Auth Service — Node.js + Express + MongoDB

A modular **Authentication Microservice** built with **Node.js**, **Express**, and **MongoDB**, featuring secure JWT-based authentication, role-based access, centralized error handling, and automated unit testing with Jest.

---

## 🚀 Features

- 🔑 User registration & login using JWT tokens  
- 🧱 Role-based access control (e.g. `student`, `admin`)  
- 🧩 Centralized error handling and logging  
- 🧪 Unit testing with Jest + Supertest + MongoMemoryServer  
- 💾 Configurable via `.env`  
- 🌍 Lightweight, container-friendly microservice  

---

## 🧰 Tech Stack
| Layer     | Technology                       |
|-----------|----------------------------------|
| Language  | Node.js                          |
| Framework | Express                          |
| Database  | MongoDB + Mongoose               |
| Auth      | JSON Web Token (JWT)             |
| Security  | bcryptjs                         |
| Testing   | Jest + Supertest                 |
| Config    | dotenv                           |
| Logging   | Winston or custom logger utility |

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/niteshsinghrajput/auth-service.git
cd auth-service
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/auth_service
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
Note: Replace your db config in above .env file
---

### 4️⃣ Start MongoDB

**Option 1: Local MongoDB**
```bash
brew services start mongodb-community
```

**Option 2: Docker MongoDB**
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```

---

### 5️⃣ Start the development server

```bash
npm run dev
```

Server will start on:  
👉 **http://localhost:5001**

---

## 🧩 API Documentation

### Base URL
```
http://localhost:5001/api/auth
```

---

### 📘 1. Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Creates a new user with hashed password.

#### Request
```bash
curl -X POST http://localhost:5001/api/auth/register   -H "Content-Type: application/json"   -d '{
    "email": "testuser@example.com",
    "password": "Test1234",
    "role": "student"
  }'
```

#### Example Response — `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "email": "testuser@example.com",
    "role": "student",
    "_id": "671d50c3a29a17a6efb46c92"
  }
}
```

---

### 📗 2. Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticates user and returns JWT token.

#### Request
```bash
curl -X POST http://localhost:5001/api/auth/login   -H "Content-Type: application/json"   -d '{
    "email": "testuser@example.com",
    "password": "Test1234"
  }'
```

#### Example Response — `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
}
```

---

### 📙 3. Access Protected Route

**Endpoint:** `GET /api/auth/protected`

**Description:** Access restricted route — requires a valid JWT token in the Authorization header.

#### Request
```bash
curl -X GET http://localhost:5001/api/auth/protected   -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response — `200 OK`
```json
{
  "user": {
    "_id": "671d50c3a29a17a6efb46c92",
    "email": "testuser@example.com",
    "role": "student"
  },
  "message": "You have accessed a protected route!"
}
```

#### Example Response — `401 Unauthorized`
```json
{
  "success": false,
  "message": "Authorization token is missing",
  "statusCode": 401
}
```

---

## 🧪 Run Tests

This service uses **Jest** and **Supertest** with an **in-memory MongoDB** (no local DB needed).

```bash
npm test
```

Expected output:

```
PASS  src/tests/auth.test.js
✓ should register a new user (300 ms)
✓ should login user and return token (250 ms)
✓ should access protected route with valid token (4 ms)
✓ should fail protected route without token (3 ms)
```

---

## 🧱 Folder Structure

```
auth-service/
├── src/
│   ├── controllers/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── AppError.js
│   │   └── logger.js
│   └── index.js
├── tests/
│   └── auth.test.js
├── .env
├── package.json
├── README.md
```

---

## 🧰 Available Scripts
| Command       | Description                 |
|---------------|-----------------------------|
| `npm start`   | Start the app in production |
| `npm run dev` | Start in dev mode (nodemon) |
| `npm test`    | Run unit tests              |

---------

## ⚠️ Common Issues

| Error                                  | Solution                                          |
|----------------------------------------|---------------------------------------------------|
| `MongoNetworkError: failed to connect` | Ensure MongoDB is running locally or in Docker    |
| `Cannot find module 'dotenv'`          | Run `npm install` to install all dependencies     |
| `Tests hang afterAll()`                | Ensure Mongoose disconnects and                   |
|                                        |  MongoMemoryServer stops properly                 |
---

## 👨‍💻 Contributing

Pull requests are welcome!  
For significant changes, please open an issue to discuss your ideas first.

---

## 🪪 License

This project is licensed under the **MIT License** — free for personal and commercial use.
