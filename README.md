
# User Management System

This is a backend system for a User Management System built with **Node.js**, **Express.js**, and **MongoDB**. The system supports user registration, login, profile management, account deactivation, account reactivation and a Super Admin feature to manage users.

---

## Features

### Users:
- Register with a name, email, password, phone number, and role.
- Login with email, password, and role.
- View and update their details (name, email, phone number).
- Deactivate their account (soft delete).

### Super Admin:
- Register with a name, email, password, phone number, and role.
- Login with email, password, and role.
- View the details of all registered users.

---

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for schema management)
- **Authentication:** JWT (JSON Web Tokens) for secure authentication
- **Password Hashing:** bcrypt for securely hashing passwords
- **Validation:** joi(library) Middleware for input validation and handling edge cases

---

## Installation and Setup

### 1. Clone the Repository
```bash

git clone https://github.com/anisahu99/First-Bench-AI-Assignment.git
cd First-Bench-AI-Assignment
cd backened
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory with the following variables:
```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=5000
```

- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: Secret string for JWT signing.
- `PORT`: Port number for the server (default: `5000`).

### 4. Run the Application
```bash
npm start
```
The server will start at: `http://localhost:5000`

---

## API Endpoints

### User Endpoints

#### 1. Register User
- **URL:** `POST api/profile/register`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "phone": "1234567890",
        "role" : "User"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "User registered successfully"
    }
    ```

#### 2. User Login
- **URL:** `POST /api/profile/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "User"
    }
    ```
- **Response:**
    ```json
    {
        "token": "<JWT_TOKEN>"
    }
    ```



#### 3. Update User Details
- **URL:** `PUT /api/users`
- **Description:** Update details of the logged-in user.
- **Headers:**
    ```plaintext
    Authorization: Bearer <JWT_TOKEN>
    ```
- **Request Body:**
    ```json
    {
        "updateName": "John Updated",
        "updatePhoneNumber": "9876543210"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "User details updated successfully"
    }
    ```

#### 4. Deactivate User Account
- **URL:** `PATCH /api/users/deactivate`
- **Description:** Deactivate the logged-in user account.
- **Headers:**
    ```plaintext
    Authorization: Bearer <JWT_TOKEN>
    ```
- **Response:**
    ```json
    {
        "msg": "Account deactivated successfully"
    }
    ```

#### 5. Reactivate User Account
- **URL:** `PATCH /api/users/reactivate`
- **Description:** Deactivate the logged-in user account.
- **Headers:**
    ```plaintext
    Authorization: Bearer <JWT_TOKEN>
    ```
- **Response:**
    ```json
    {
        "msg": "Account reactivated successfully"
    }
    ```

---

### Admin Endpoints

#### 1. Register Admin
- **URL:** `POST api/profile/register`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "name": "Admin Doe",
        "email": "admin.doe@example.com",
        "password": "password123",
        "phone": "1234567890",
        "role" : "Admin"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "Admin registered successfully"
    }
    ```

#### 2. Admin Login
- **URL:** `POST /api/profile/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
    ```json
    {
        "email": "admin.doe@example.com",
        "password": "password123",
        "role": "Admin"
    }
    ```
- **Response:**
    ```json
    {
        "token": "<JWT_TOKEN>"
    }
    ```

#### 3. Get All Users (Super Admin)
- **URL:** `GET /api/admin`
- **Description:** Retrieve the details of all registered users (accessible only to the Super Admin).
- **Headers:**
    ```plaintext
    Authorization: Bearer <SUPER_ADMIN_JWT_TOKEN>
    ```
- **Response:**
    ```json
    [
        {
            "_id": "12345",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "active": true
        }
    ]
    ```

---

## Validation Rules
- **Email:** Must be a valid email format.
- **Password:** Minimum 8 characters.
- **Phone Number:** Should be valid (length and numeric check).
- **Unique Fields:** No duplicate email addresses.

---

## Testing

You can test the API endpoints using Postman. Follow these steps:

1. **Import Postman Collection:**
   - Download the collection JSON file (`User-Management-System-API.postman_collection.json`) from this repository.
   - Open Postman, click **Import**, and upload the JSON file.

2. **Test API Workflow:**
   - Register a new user using `/api/profile/register`.
   - Log in as the user using `/api/profile/login` to get a JWT token.
   - Test other endpoints like `/api/users (PUT)`, `/api/users/deactivate (PATCH)`, and `/api/users/reactivate (PATCH)`.
   - Log in as the Super Admin to access `/api/admin`.

---

## Postman Collection
You can access the Postman collection for testing all APIs via this link:  
[User Management System API Collection](#)  
Alternatively, you can download the JSON file from this repository and import it into Postman.

---

## Folder Structure
- `controllers/`: Logic for API endpoints
- `models/`: Mongoose schemas
- `config/`: Database connection
- `docs/`: API documentation
- `routes/`: API routes
- `middleware/`: Middleware for authentication and validation
- `validators/`: Schema validation functions
- `app.js`: Main application file

---

