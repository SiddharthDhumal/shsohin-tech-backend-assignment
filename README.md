**User Management API (CRUD Operations) - Node.js, Express, MongoDB
This is a production-ready RESTful API for managing users, implementing CRUD operations with security best practices including JWT authentication, data validation, error handling, and logging.**

🚀 Features 

✅ User Registration & Login (JWT Authentication)

✅ Password Hashing (bcrypt)

✅ Secure API Routes (Authorization Middleware)

✅ Data Validation (Joi)

✅ Error Handling (Centralized Error Middleware)

✅ Environment Variables (dotenv)

✅ Security Best Practices (Helmet, CORS, Rate Limiting)



**📌 Tech Stack**

Node.js - Backend Runtime
Express.js - Web Framework
MongoDB - Database
Mongoose - MongoDB ODM
Joi - Data Validation
jsonwebtoken (JWT) - Authentication
bcryptjs - Password Hashing
dotenv - Environment Variables
helmet - Security Headers
express-rate-limit - Rate Limiting



**🛠 Setup & Installation**

1️⃣ Clone the Repository

git clone https://github.com/SiddharthDhumal/shsohin-tech-backend-assignment.git


2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:


PORT=3000
MONGO_DB_URL=mongodb://localhost:27017/user_data
JWT_SECRET=372814E74FB5E5AA32557D37D625F
JWT_COOKIE_EXPIRES_IN=10d

4️⃣ Run the Application

# Development Mode
npm run dev

# Production Mode
npm start
Server runs on: http://localhost:3000

🔒 Security Best Practices Implemented
✅ Password Hashing: bcryptjs
✅ JWT Authentication: Secure access control
✅ Validation: Joi ensures correct user input
✅ Error Handling: Centralized middleware for errors
✅ Rate Limiting: Prevent brute-force attacks
✅ Helmet: Adds security headers
✅ CORS: Restricts API access

📌 API Endpoints

1️⃣ User Registration

✅ Endpoint: POST /api/v1/auth/register
✅ Description: Register a new user
✅ Body Parameters:


{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongPass@123"
}

✅ Response:

{
    "status": "success",
    "data": {
        "newUser": {
            "name": "Jhon Doe",
            "email": "example@gmail.com",
            "_id": "67bff08af127f40c105c8f81",
            "createdAt": "2025-02-27T04:56:42.445Z",
            "updatedAt": "2025-02-27T04:56:42.445Z",
            "__v": 0
        }
    }
}

2️⃣ User Login

✅ Endpoint: POST /api/v1/auth/login
✅ Description: Authenticate user and get JWT
✅ Body Parameters:

{
  "email": "john.doe@example.com",
  "password": "StrongPass@123"
}
✅ Response:


{
    "status": "success",
    "token":  "Bearer <TOKEN>",
    "data": {
        "user": {
            "_id": "67bff08af127f40c105c8f81",
            "name": "Jhon Doe",
            "email": "john.doe@example.com",
            "createdAt": "2025-02-27T04:56:42.445Z",
            "updatedAt": "2025-02-27T04:56:42.445Z",
            "__v": 0
        }
    }
}

3️⃣ Get All Users  (Logged-in User Only)

✅ Endpoint: GET /api/v1/users
✅ Headers:

{
  "Authorization": "Bearer <JWT_TOKEN>"
}

OR 

✅ Cookie:
 req.cookie : {
 token :"Bearer <JWT_TOKEN>"
 }

✅ Response:


[
  { 
  "id": "1",
  "name": "John",
  "email": "john@example.com" 
  },
  { "id": "2",
  "name": "Jane",
  "email": "jane@example.com"
  }
]

4️⃣ Get User by ID

✅ Endpoint: GET /api/v1/users/:id
✅ Headers:



{
  "Authorization": "Bearer <JWT_TOKEN>"
}

OR 

✅ Cookie:
 req.cookie: {
 token :"Bearer <JWT_TOKEN>"
 }

✅ Response:



{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com"
}

5️⃣ Update User (Logged-in User Only)

✅ Endpoint: PUT /api/v1/users/:id
✅ Headers:


{
  "Authorization": "Bearer <JWT_TOKEN>"
}

OR 

✅ Cookie:
 req.cookie: {
 token :"Bearer <JWT_TOKEN>"
 }

✅ Body Parameters (Optional Fields Allowed):


{
  "name": "Updated Name",
  "email": "updated.email@example.com"
}
✅ Response:


{
  "message": "User updated successfully!"
}
6️⃣ Delete User (Logged-in User Only)

✅ Endpoint: DELETE /api/v1/users/:id
✅ Headers:

{
  "Authorization": "Bearer <JWT_TOKEN>"
}

OR 

✅ Cookie:
 req.cookie: {
 token :"Bearer <JWT_TOKEN>"
 }

 
✅ Response:


{
  "message": "User deleted successfully!"
}
🔐 Middleware Implementations

1️⃣ JWT Authentication Middleware (verify.js)

2️⃣ Error Handling Middleware (appError.js)



🛠 Deployment Instructions

1️⃣ Install Dependencies

npm install

2️⃣ Build for Production

npm run build

3️⃣ Start in Production Mode

npm start



✅ Best Practices Followed
✔ Use of JWT Authentication
✔ Proper Validation with Joi
✔ Secure Password Hashing (bcryptjs)
✔ Centralized Error Handling
✔ Rate Limiting for Security
✔ Environment Variables for Configurations
✔ CORS & Helmet for Security
