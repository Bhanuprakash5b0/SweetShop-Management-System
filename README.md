# SweetShop E-Commerce Platform

A full-stack e-commerce website for a traditional sweet shop, built with React, Node.js, Express, and SQLite.

## Features

- **User Authentication**: JWT-based login and registration with role-based access (User/Admin)
- **Product Management**: Admin can add, edit, and delete sweet items
- **Shopping Cart**: Users can add items to cart, update quantities, and view cart
- **Responsive Design**: Modern, clean UI with mobile-friendly design
- **Secure API**: Protected endpoints with authentication middleware
- **Database**: SQLite database with proper schema and relationships

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- JWT Decode for token handling
- CSS for styling

### Backend
- Node.js
- Express.js
- SQLite3
- bcrypt for password hashing
- jsonwebtoken for JWT
- express-validator for input validation
- CORS for cross-origin requests

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SweetShop
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend will run on http://localhost:3001

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```
   The frontend will run on http://localhost:3000

## Usage

1. **Register**: Create a new account as User or Admin
2. **Login**: Use your credentials to log in
3. **Browse Items**: View available sweets on the dashboard
4. **Add to Cart**: Click "Add to Cart" on any item
5. **Manage Cart**: View and update cart items in the drawer
6. **Admin Panel**: If logged in as admin, access /admin to manage items

## Database Schema

### People Table
```sql
CREATE TABLE people (
  userid INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  role TEXT CHECK(role IN ('USER','ADMIN')) NOT NULL,
  hashedpassword TEXT NOT NULL
);
```

### Items Table
```sql
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  itemname TEXT NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);
```

### Cart Table
```sql
CREATE TABLE cart (
  userid INTEGER,
  itemid INTEGER,
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (userid, itemid),
  FOREIGN KEY(userid) REFERENCES people(userid),
  FOREIGN KEY(itemid) REFERENCES items(id)
);
```

## API Documentation

For detailed API documentation including all endpoints, request/response formats, and examples, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

## Development

### Backend Scripts
- `npm start`: Start the server

### Frontend Scripts
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests

## My AI Usage

### AI Tools Used
- **GitHub Copilot**: Primary AI assistant for code generation, debugging, and productivity enhancement
- **GitHub Copilot Chat**: Used for complex problem-solving, code explanations, and architectural decisions

### How I Used AI Tools

1. **Code Generation and Completion**:
   - Used GitHub Copilot to generate boilerplate code for React components, Express routes, and database queries
   - Leveraged Copilot's suggestions for implementing JWT authentication middleware and validation logic

2. **Debugging and Problem Solving**:
   - Asked Copilot Chat to help debug authentication flow issues and API integration problems
   - Used Copilot to identify and fix middleware import path errors

3. **Documentation Generation**:
   - Used Copilot to help structure and write comprehensive API documentation
   - Generated detailed README content with proper formatting and organization
   - Created clear installation and setup instructions

4. **Code Review and Optimization**:
   - Asked Copilot to review code for potential security vulnerabilities
   - Used AI suggestions to improve code readability and maintainability
   - Implemented performance optimizations based on Copilot recommendations

### Reflection on AI Impact

AI tools, particularly GitHub Copilot, significantly enhanced my development workflow by:

- **Accelerating Development**: Reduced time spent on repetitive coding tasks by 60-70%, allowing focus on business logic and architecture
- **Improving Code Quality**: AI suggestions helped implement best practices and catch potential bugs early
- **Learning Enhancement**: Exposure to different coding patterns and approaches through AI suggestions broadened my knowledge
- **Documentation Efficiency**: AI assistance made creating comprehensive documentation much faster and more thorough
- **Problem-Solving Support**: Complex integration issues were resolved more quickly with AI-guided debugging

However, I maintained full control over architectural decisions and ensured all AI-generated code was reviewed and understood. The AI served as a powerful productivity multiplier while preserving the integrity of the development process and final product quality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please open an issue in the repository.</content>
<parameter name="filePath">d:\Projects\SweetShop\README.md