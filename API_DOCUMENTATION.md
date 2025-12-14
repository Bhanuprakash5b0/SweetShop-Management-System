# SweetShop API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Headers:**
- Content-Type: application/json

**Request Body:**
```json
{
  "name": "string (required, min 3 chars)",
  "password": "string (required, min 6 chars)",
  "role": "USER" | "ADMIN" (optional, defaults to USER)
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- 400: Validation errors or user already exists
- 500: Server error

#### POST /auth/login
Authenticate user and receive JWT token.

**Headers:**
- Content-Type: application/json

**Request Body:**
```json
{
  "name": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "token": "jwt_token_string"
}
```

**Error Responses:**
- 400: Validation errors
- 401: Invalid credentials
- 404: User not found
- 500: Server error

### Items Management (Admin Only)

#### GET /items
Retrieve all available items.

**Headers:**
- Authorization: Bearer <token>

**Success Response (200):**
```json
[
  {
    "id": 1,
    "itemname": "Gulab Jamun",
    "price": 50,
    "quantity": 100
  },
  {
    "id": 2,
    "itemname": "Ras Malai",
    "price": 60,
    "quantity": 75
  }
]
```

**Error Responses:**
- 401: Unauthorized
- 403: Forbidden (not admin)
- 500: Server error

#### POST /items
Add a new item to the store.

**Headers:**
- Authorization: Bearer <token>
- Content-Type: application/json

**Request Body:**
```json
{
  "itemname": "string (required)",
  "price": "number (required, positive)",
  "quantity": "number (required, non-negative)"
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- 400: Invalid input
- 401: Unauthorized
- 403: Forbidden
- 500: Server error

#### PUT /items/:id
Update an existing item.

**Headers:**
- Authorization: Bearer <token>
- Content-Type: application/json

**URL Parameters:**
- id: Item ID (integer)

**Request Body:**
```json
{
  "itemname": "string (required)",
  "price": "number (required, positive)",
  "quantity": "number (required, non-negative)"
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- 400: Invalid input
- 401: Unauthorized
- 403: Forbidden
- 404: Item not found
- 500: Server error

#### DELETE /items/:id
Remove an item from the store.

**Headers:**
- Authorization: Bearer <token>

**URL Parameters:**
- id: Item ID (integer)

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- 401: Unauthorized
- 403: Forbidden
- 404: Item not found
- 500: Server error

### Cart Management (Authenticated Users)

#### GET /cart
Get the current user's shopping cart.

**Headers:**
- Authorization: Bearer <token>

**Success Response (200):**
```json
[
  {
    "id": 1,
    "itemname": "Gulab Jamun",
    "price": 50,
    "quantity": 3
  },
  {
    "id": 2,
    "itemname": "Ras Malai",
    "price": 60,
    "quantity": 1
  }
]
```

**Error Responses:**
- 401: Unauthorized
- 500: Server error

#### POST /cart
Add an item to the cart or increase its quantity.

**Headers:**
- Authorization: Bearer <token>
- Content-Type: application/json

**Request Body:**
```json
{
  "itemid": "number (required, valid item ID)"
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- 400: Invalid item ID
- 401: Unauthorized
- 404: Item not found
- 500: Server error

#### PUT /cart
Update the quantity of an item in the cart.

**Headers:**
- Authorization: Bearer <token>
- Content-Type: application/json

**Request Body:**
```json
{
  "itemid": "number (required)",
  "quantity": "number (required, 0 or positive)"
}
```

**Notes:**
- If quantity is 0, the item is removed from the cart
- If quantity > 0, it updates the cart item quantity

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Responses:**
- 400: Invalid input
- 401: Unauthorized
- 404: Item not found in cart
- 500: Server error

## Error Response Format

### Validation Errors (400)
```json
{
  "errors": [
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### General Errors
```json
{
  "message": "User not found"
}
```

## Rate Limiting
Currently no rate limiting is implemented. Consider adding it for production use.

## Data Types

- **name**: String, 3-255 characters
- **password**: String, minimum 6 characters
- **role**: Enum ("USER", "ADMIN")
- **itemname**: String, 1-255 characters
- **price**: Integer, positive number
- **quantity**: Integer, non-negative number
- **id**: Integer, auto-generated primary key

## Testing the API

You can test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl command for login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"name":"testuser","password":"password123"}'
```</content>
<parameter name="filePath">d:\Projects\SweetShop\API_DOCUMENTATION.md