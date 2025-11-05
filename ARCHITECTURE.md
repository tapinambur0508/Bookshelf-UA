# Architecture & Design Decisions

## Overview

This full-stack application follows a clean architecture pattern with clear separation of concerns between frontend and backend.

## Frontend Architecture

### Technology Choices

**React + TypeScript**: Chosen for type safety, developer experience, and component reusability. TypeScript helps catch errors at compile time and improves code maintainability.

**Vite**: Selected over Create React App for faster build times, better HMR (Hot Module Replacement), and modern tooling out of the box.

**TailwindCSS**: Utility-first CSS framework that allows rapid UI development without writing custom CSS. Provides consistent design system and responsive utilities.

**Auth0 React SDK**: Provides seamless SSO integration with minimal configuration. Handles token management, refresh, and user session automatically.

### Component Structure

```
components/
├── AuthButtons.tsx      # Login/Logout buttons
├── BookCard.tsx         # Individual book display card
├── BookForm.tsx         # Create/Edit book modal form
├── BooksList.tsx        # Main book listing with pagination
└── ProtectedRoute.tsx   # Route guard for authenticated routes
```

### State Management

- **Local State**: React hooks (`useState`, `useEffect`) for component-level state
- **API State**: Handled in components with loading/error states
- **Auth State**: Managed by Auth0 React SDK via context

### API Integration

- Centralized API client (`services/api.ts`) with axios interceptors
- Automatic token injection from localStorage
- Type-safe API methods with TypeScript interfaces
- Error handling at service level

## Backend Architecture

### Technology Choices

**Node.js + Express + TypeScript**: Provides type safety, modern JavaScript features, and a robust HTTP server framework.

**MongoDB + Mongoose**: Document-based database fits well with JavaScript/TypeScript. Mongoose provides schema validation and type safety.

**Auth0 JWT**: Server-side token verification ensures only authenticated users can modify data. Uses RS256 algorithm for secure token validation.

**Joi**: Runtime validation for request payloads. Catches invalid data before it reaches controllers.

### Architecture Layers

```
controllers/     # Request/Response handling
repositories/   # Data access abstraction
models/          # Database schemas
middleware/      # Cross-cutting concerns (auth, validation, errors)
routes/          # Route definitions
schemas/         # Validation schemas
```

### Security Considerations

1. **CORS**: Configured to allow requests only from frontend origin
2. **Helmet**: Adds security headers to responses
3. **JWT Verification**: All write operations require valid Auth0 token
4. **Input Validation**: All requests validated with Joi schemas
5. **Error Handling**: Centralized error handler prevents information leakage

### API Design

- **RESTful**: Follows REST conventions (GET, POST, PUT, DELETE)
- **Pagination**: GET endpoints support pagination via query parameters
- **Status Codes**: Appropriate HTTP status codes (200, 201, 204, 400, 401, 404, 500)
- **Error Format**: Consistent error response format

## Authentication Flow

1. User clicks "Log In" → Redirected to Auth0 login page
2. User authenticates (email/password, social login, etc.)
3. Auth0 redirects back to app with authorization code
4. Frontend exchanges code for access token (handled by Auth0 SDK)
5. Token stored in localStorage
6. API requests include token in Authorization header
7. Backend verifies token with Auth0's JWKS endpoint
8. Request proceeds if token is valid

## Database Schema

```typescript
Book {
  _id: ObjectId (MongoDB auto-generated)
  title: string (required)
  author: string (required)
}
```

Simple schema suits the demo nature of the application. Could be extended with:

- User ownership (associate books with users)
- Additional metadata (ISBN, publication date, etc.)
- Soft deletes
- Timestamps

## Deployment Considerations

### Frontend

- Build output is static files → can be deployed to CDN
- Environment variables prefixed with `VITE_` for Vite
- Auth0 callback URLs must match production domain

### Backend

- Requires Node.js runtime environment
- Environment variables for secrets and configuration
- MongoDB connection (local or cloud)
- CORS origin must match frontend URL

## Future Improvements

1. **User-specific data**: Associate books with authenticated users
2. **Search functionality**: Full-text search for books
3. **Image uploads**: Book cover images
4. **Rate limiting**: Prevent API abuse
5. **Caching**: Redis for frequently accessed data
6. **Testing**: Unit and integration tests
7. **Monitoring**: Logging and error tracking (e.g., Sentry)
8. **CI/CD**: Automated testing and deployment pipelines
