# Bookshelf - Full-Stack Application

A modern full-stack web application for managing your personal book collection. Built with React, TypeScript, Node.js, Express, MongoDB, and Auth0 for authentication.

## 🏗️ Architecture

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Authentication**: Auth0 React SDK
- **HTTP Client**: Axios
- **Routing**: React Router

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Auth0 JWT verification
- **Validation**: Joi

## 📋 Prerequisites

- Node.js (v22+ recommended)
- npm (v10+)
- MongoDB Atlas account (free tier available) or local MongoDB instance
- Auth0 account (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Bookshelf-master
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=8080
HOST=0.0.0.0
FRONTEND_URL=http://localhost:5173
# MongoDB Atlas connection string (or local: mongodb://localhost:27017/bookshelf)
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookshelf

# Auth0 Configuration
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=your-api-identifier
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8080

# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

### 4. Auth0 Configuration

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new Application (Single Page Application)
3. Create a new API with an identifier (this will be your `AUTH0_AUDIENCE`)
4. Configure the following:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
5. Copy your Domain, Client ID, and API Identifier to the `.env` files

### 5. Database Setup

**Option 1: MongoDB Atlas (Recommended for production)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier available)
3. Configure Network Access - add `0.0.0.0/0` for development or restrict to specific IPs
4. Create a database user
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your user password
   - Replace `<dbname>` with `bookshelf` (or your preferred database name)
6. Update `DB_URI` in your `.env` file

**Option 2: Local MongoDB**

Make sure MongoDB is running locally on your machine.

Optional: Import sample data:

```bash
mongoimport --db bookshelf --collection books --file backend/books.json --jsonArray
```

### 6. Run the Application

**Backend** (from `backend` directory):

```bash
npm run dev
```

**Frontend** (from `frontend` directory):

```bash
npm run dev
```

The application will be available at:

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:8080>

## 📚 API Endpoints

### Books API

- `GET /books` - Get paginated list of books (query params: `page`, `limit`)
- `GET /books/:id` - Get a specific book by ID
- `POST /books` - Create a new book (requires authentication)
- `PUT /books/:id` - Update a book (requires authentication)
- `DELETE /books/:id` - Delete a book (requires authentication)

## 🔐 Authentication

The application uses Auth0 for Single Sign-On (SSO) authentication:

- **Read operations** (GET) are public
- **Write operations** (POST, PUT, DELETE) require authentication
- Users authenticate via Auth0's login page
- JWT tokens are automatically included in authenticated requests

## 🎨 Features

- ✅ User authentication with Auth0 SSO
- ✅ CRUD operations for books
- ✅ Pagination for book listings
- ✅ Responsive design with TailwindCSS
- ✅ Type-safe codebase with TypeScript
- ✅ Input validation with Joi
- ✅ Error handling and user feedback

## 🛠️ Development

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📦 Project Structure

```
Bookshelf-master/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/      # Auth, validation, error handlers
│   │   ├── models/          # Mongoose models
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API routes
│   │   ├── schemas/         # Joi validation schemas
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── dist/                # Compiled JavaScript
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── hooks/           # Custom React hooks
    │   ├── pages/           # Page components
    │   ├── providers/       # Context providers
    │   ├── services/        # API services
    │   └── App.tsx          # Main app component
    └── package.json
```

## 🚢 Deployment

### DigitalOcean App Platform Deployment

This project includes a deployment configuration for DigitalOcean App Platform. See [`.do/DEPLOYMENT.md`](.do/DEPLOYMENT.md) for detailed instructions.

**Quick Start:**

1. Update `.do/app.yaml` with your GitHub repository details
2. Set environment variables in DigitalOcean dashboard:
   - `DB_URI` - MongoDB Atlas connection string
   - `AUTH0_DOMAIN` - Your Auth0 domain
   - `AUTH0_AUDIENCE` - Your Auth0 API identifier
   - `VITE_AUTH0_CLIENT_ID` - Your Auth0 Client ID
3. Connect your GitHub repository to DigitalOcean App Platform
4. DigitalOcean will automatically detect and use `.do/app.yaml`

**After Deployment:**

1. Update Auth0 settings with production URLs:
   - Allowed Callback URLs: `https://your-frontend-url`
   - Allowed Logout URLs: `https://your-frontend-url`
   - Allowed Web Origins: `https://your-frontend-url`
2. Verify environment variables are set correctly
3. Test the health check endpoint: `https://your-backend-url/books`

### Manual Deployment

#### Backend Deployment

1. Build the backend: `cd backend && npm run build`
2. Set environment variables on your hosting platform
3. Deploy the `dist` folder and `node_modules`

#### Frontend Deployment

1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Set environment variables during build:
   - `VITE_API_URL` - Your backend API URL
   - `VITE_AUTH0_DOMAIN` - Your Auth0 domain
   - `VITE_AUTH0_CLIENT_ID` - Your Auth0 Client ID
   - `VITE_AUTH0_AUDIENCE` - Your Auth0 API identifier
4. Update Auth0 callback URLs to match your production domain

### Environment Variables

**Backend:**

- `PORT` - Server port (default: 8080)
- `HOST` - Server host (default: 0.0.0.0)
- `FRONTEND_URL` - Frontend URL for CORS (required)
- `DB_URI` - MongoDB connection string (required)
- `AUTH0_DOMAIN` - Auth0 domain (required)
- `AUTH0_AUDIENCE` - Auth0 API identifier (required)

**Frontend:**

- `VITE_API_URL` - Backend API URL (required)
- `VITE_AUTH0_DOMAIN` - Auth0 domain (required)
- `VITE_AUTH0_CLIENT_ID` - Auth0 Client ID (required)
- `VITE_AUTH0_AUDIENCE` - Auth0 API identifier (required)

## 📝 Notes

- The backend uses MongoDB for data persistence
- Authentication is handled via Auth0's JWT tokens
- CORS is configured to allow requests from the frontend
- The application follows RESTful API principles
- Error handling is implemented on both frontend and backend

## 🤝 Contributing

This is a demonstration project. Feel free to fork and extend it!

## 📄 License

This project is open source and available for educational purposes.
