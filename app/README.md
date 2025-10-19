# Frontend Application

## Overview

This directory contains the React-based frontend application for DataMentor. Built with modern web technologies, the application provides an interactive user interface for database learning, featuring lesson delivery, SQL practice environments, AI-powered tutoring, and progress tracking capabilities.

## Architecture

The frontend follows a component-based architecture using React 18.3 with TypeScript for type safety. The application is structured as a single-page application (SPA) with client-side routing, responsive design principles, and a clear separation of concerns through distinct layers for presentation, business logic, and data access.

### Key Architectural Patterns

- **Component-Driven Development**: Reusable, modular UI components with clear responsibilities
- **Repository Pattern**: Abstraction layer for data access operations
- **Service Layer**: Centralized business logic and external API communication
- **Context API**: Global state management for theme and authentication
- **Custom Hooks**: Encapsulated stateful logic for authentication and data fetching

## Technology Stack

### Core Framework
- **React 18.3**: Component-based UI library with concurrent features
- **TypeScript**: Static type checking for improved code quality and developer experience
- **Vite**: Next-generation build tool providing fast development server and optimized production builds

### Styling and UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Consistent icon library with 1000+ customizable icons
- **Dark Mode Support**: Theme system with persistent user preferences

### Routing and Navigation
- **React Router DOM**: Declarative routing for single-page application navigation
- **Protected Routes**: Authentication-based route guarding

### Content Rendering
- **React Markdown**: Markdown-to-React conversion for lesson content
- **Remark GFM**: GitHub Flavored Markdown support for enhanced formatting
- **React Syntax Highlighter**: Code syntax highlighting for SQL examples

### Authentication and Backend Integration
- **Supabase Client**: JavaScript client for Supabase backend services
- **Supabase Auth UI**: Pre-built authentication UI components
- **Row-Level Security**: Client-side enforcement of database access policies

### Internationalization
- **i18next**: Feature-rich internationalization framework
- **react-i18next**: React bindings for i18next
- **i18next-browser-languagedetector**: Automatic language detection

### Form Validation
- **Zod**: TypeScript-first schema validation library

### Development Tools
- **ESLint**: Code linting and style enforcement
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Vite Plugin React**: Fast Refresh and JSX runtime optimization

## Project Structure

```
app/web/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AIChatButton.tsx
│   │   ├── AIChatMessageBox.tsx
│   │   ├── AIQuotaProgress.tsx
│   │   ├── DatabaseSchemaViewer.tsx
│   │   ├── LessonCard.tsx
│   │   ├── PracticeQuestionBox.tsx
│   │   └── ...
│   │
│   ├── features/             # Feature-level components
│   │   ├── AIAssistant.tsx   # AI tutoring interface
│   │   ├── LearningContent.tsx  # Lesson display and navigation
│   │   └── QueryPractice.tsx    # SQL query execution environment
│   │
│   ├── pages/                # Route-level page components
│   │   ├── AuthCallback.tsx
│   │   └── ResetComplete.tsx
│   │
│   ├── repository/           # Data access layer
│   │   ├── db_types/         # TypeScript DTOs matching database schema
│   │   ├── difificultyRepository.ts
│   │   ├── lessonRepository.ts
│   │   ├── moduleRepository.ts
│   │   ├── progressRepository.ts
│   │   └── ...
│   │
│   ├── services/             # Business logic and API clients
│   │   ├── dto/              # Data transfer objects
│   │   ├── AiPracticeExerciseService.ts
│   │   ├── AIUsageService.ts
│   │   ├── LearningContentService.ts
│   │   ├── OpenAiService.ts
│   │   ├── SandboxService.ts
│   │   └── ...
│   │
│   ├── contexts/             # React context providers
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useSupabaseAuth.ts
│   │
│   ├── i18n/                 # Internationalization
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── index.ts
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── question.ts
│   │   └── user.ts
│   │
│   ├── lib/                  # Library configurations
│   │   └── supabaseClient.ts
│   │
│   ├── constants/            # Application constants
│   │   └── environmentConfigs.ts
│   │
│   ├── App.tsx               # Root application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and Tailwind directives
│
├── public/                   # Static assets
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Key Features

### Component Organization

**Components Directory**: Contains reusable UI components with single responsibilities. Each component is self-contained and can be imported throughout the application.

**Features Directory**: Houses larger feature-specific components that compose multiple smaller components to deliver complete functionality (e.g., AI tutoring, query practice).

**Pages Directory**: Contains top-level route components that represent distinct application views.

### Data Management

**Repository Layer**: Provides abstraction over Supabase database operations. Each repository handles a specific database table or related set of tables, implementing CRUD operations and complex queries.

**Service Layer**: Encapsulates business logic, data transformation, and communication with external services (Supabase Edge Functions, OpenAI API). Services consume repositories and expose higher-level operations to components.

**DTO Pattern**: Data Transfer Objects define the shape of data moving between layers, ensuring type safety and clear contracts.

### State Management

**Local State**: Component-specific state managed with React hooks (`useState`, `useReducer`)

**Context API**: Global state for theme preferences and authentication status

**Server State**: Data fetched from Supabase, managed through repositories and services

### Internationalization

The application supports multiple languages through i18next. Translation keys are organized by feature area, and the browser's language preference is automatically detected on initial load. Users can manually switch languages via the language selector component.

### Responsive Design

The interface adapts to various screen sizes using Tailwind CSS responsive utilities. Breakpoints are configured for mobile, tablet, and desktop viewports, ensuring optimal user experience across devices.

### Authentication Flow

1. User accesses protected route
2. Authentication check via Supabase client
3. Redirect to login if unauthenticated
4. Supabase Auth UI handles sign-up/sign-in
5. Callback route processes authentication result
6. User redirected to intended route with session established

## Development

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Setup

```bash
# Install dependencies
npm install

# Start development server (from project root)
npm run dev:web

# Build for production
npm run build:web

# Preview production build
npm run preview:web
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## Deployment

The application is configured for deployment on Vercel. The `vercel.json` configuration file specifies routing rules and build settings.

### Build Output
- **dist/index.html**: Entry HTML file
- **dist/assets/**: Bundled JavaScript, CSS, and static assets

### Deployment Steps
1. Push code to Git repository
2. Connect repository to Vercel project
3. Configure environment variables in Vercel dashboard
4. Automatic deployment on push to main branch

## Best Practices

### Component Development
- Keep components focused on a single responsibility
- Use TypeScript interfaces for prop types
- Implement proper error boundaries
- Follow accessibility guidelines (ARIA labels, keyboard navigation)

### State Management
- Lift state up only when necessary
- Use context for truly global state
- Prefer composition over prop drilling
- Implement loading and error states

### Data Fetching
- Always use repository layer for database operations
- Implement proper error handling
- Show loading indicators during async operations
- Cache data when appropriate

### Performance
- Lazy load routes and heavy components
- Memoize expensive computations
- Optimize re-renders with React.memo
- Use proper key props in lists

## Integration Points

### Supabase Backend
- **Authentication**: User sign-up, sign-in, session management
- **Database**: Lessons, modules, practice exercises, student progress
- **Edge Functions**: AI tutoring, question generation, sandbox operations

### Oracle Autonomous Database
- **Sandbox Environment**: SQL query execution via ORDS REST API
- **Schema Management**: Database initialization and reset operations

### OpenAI API
- **AI Tutoring**: Contextual assistance via GPT-4o model
- **Question Generation**: AI-powered practice question creation

## Contributing

When contributing to the frontend:

1. Follow the established project structure
2. Maintain TypeScript type safety
3. Write semantic, accessible HTML
4. Use Tailwind CSS classes consistently
5. Implement proper error handling
6. Add internationalization keys for new text content
7. Test across different screen sizes
8. Ensure dark mode compatibility
