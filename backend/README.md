# SweetShop Backend

The Node.js/Express backend API for the SweetShop e-commerce platform.

## Features

- RESTful API with JWT authentication
- SQLite database with proper schema
- Role-based access control (User/Admin)
- Input validation and error handling
- CORS enabled for frontend integration

## Tech Stack

- Node.js
- Express.js
- SQLite3
- bcrypt
- jsonwebtoken
- express-validator

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3001

## Environment

The backend uses the following:
- Port: 3001
- Database: SQLite (./db/sweetshop.db)
- JWT Secret: "SECRET_KEY" (change in production)

## Project Structure

```
backend/
├── controllers/     # Route handlers
├── db/             # Database setup and schema
├── middleware/     # Authentication and role middleware
├── routes/         # API route definitions
├── app.js          # Main application file
└── package.json    # Dependencies
```

## Database Initialization

The database is automatically initialized when the server starts using the schema in `db/schema.sql`.

## API Routes

See the main [API Documentation](../API_DOCUMENTATION.md) for detailed endpoint information.</content>
<parameter name="filePath">d:\Projects\SweetShop\backend\README.md