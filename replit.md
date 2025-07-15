# ShopCraft E-commerce Platform

## Overview

ShopCraft is a modern e-commerce platform built with React, TypeScript, and Express.js. The application features a professional shopping interface with product browsing, filtering, cart management, and a responsive design that works across all devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state and local React state for UI
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Radix UI primitives for accessibility and consistency

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with potential for PostgreSQL sessions
- **API Design**: RESTful API with proper error handling and logging

### Key Design Decisions
1. **Monorepo Structure**: Shared schema between client and server for type safety
2. **TypeScript-First**: Full type safety across the entire application
3. **Component-Based UI**: Modular, reusable components following shadcn/ui patterns
4. **Responsive Design**: Mobile-first approach with Tailwind CSS
5. **Local-First Cart**: Uses localStorage for cart persistence with server sync capability

## Key Components

### Frontend Components
- **Header**: Navigation with search, theme toggle, and cart indicator
- **ProductGrid**: Displays products with filtering and sorting
- **ProductCard**: Individual product display with actions
- **CartModal**: Shopping cart interface with quantity management
- **FilterSection**: Product filtering by category, price range, and search
- **ThemeProvider**: Dark/light mode toggle functionality

### Backend Components
- **Storage Layer**: Abstract interface with in-memory implementation
- **Routes**: RESTful API endpoints for products, cart, and categories
- **Schema**: Drizzle ORM schema definitions for database tables
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Data Flow

### Product Management
1. Products are stored in PostgreSQL with Drizzle ORM
2. Server provides filtered product data via REST API
3. Client fetches and caches product data using React Query
4. Real-time search and filtering without additional API calls

### Cart Management
1. Cart items stored in localStorage for persistence
2. Cart state managed through custom React hooks
3. Server API endpoints ready for cart synchronization
4. Real-time cart updates with optimistic UI updates

### State Management
1. Server state handled by React Query with caching
2. UI state managed with React hooks and context
3. Theme state persisted in localStorage
4. Cart state synchronized between localStorage and server

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Database ORM with type safety
- **@neondatabase/serverless**: PostgreSQL database provider
- **wouter**: Lightweight routing library
- **zod**: Schema validation and type inference

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking and compilation
- **eslint**: Code linting and quality
- **postcss**: CSS processing

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild compiles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `drizzle-kit push`

### Production Configuration
- **Environment**: Node.js with ESM modules
- **Database**: PostgreSQL connection via DATABASE_URL
- **Static Assets**: Served from Express for production builds
- **Development**: Vite dev server with HMR for client-side development

### Scalability Considerations
- **Database**: PostgreSQL with connection pooling
- **Caching**: React Query for client-side caching
- **CDN**: Static assets can be served from CDN
- **Session Management**: Can be upgraded to database-backed sessions

### Security Features
- **Input Validation**: Zod schemas for API validation
- **CORS**: Configured for production domains
- **Error Handling**: Sanitized error responses
- **Type Safety**: Full TypeScript coverage prevents runtime errors

The architecture is designed to be scalable, maintainable, and provides a solid foundation for a modern e-commerce platform with room for features like user authentication, payment processing, and order management.