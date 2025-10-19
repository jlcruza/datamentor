# DataMentor: An Interactive Database Learning Platform

## Project Overview

DataMentor is a comprehensive educational web platform designed to facilitate database learning through interactive lessons, practical exercises, and AI-assisted tutoring. Developed as part of the Master's degree program at Polytechnic University of Puerto Rico, this platform addresses the need for accessible, hands-on database education by combining theoretical content with practical SQL execution environments.

The platform provides structured learning modules covering fundamental to advanced database concepts, including relational database theory, SQL operations, data modeling, query optimization, and non-relational databases. Students can practice SQL queries in a sandboxed Oracle Autonomous Database environment, receive immediate feedback, and engage with an AI tutor powered by OpenAI's GPT models for personalized assistance.

## Features

### Core Learning Capabilities
- **Structured Curriculum**: Six comprehensive modules with 36 lessons spanning database fundamentals to advanced topics
- **Progressive Difficulty Levels**: Lessons categorized as beginner, intermediate, or advanced to support learner progression
- **Interactive Content Delivery**: Markdown-based lesson content with syntax-highlighted code examples

### Practice Environment
- **SQL Sandbox**: Isolated Oracle Autonomous Database environment for hands-on query execution
- **Practice Exercises**: Curated question sets with multiple-choice format and detailed explanations
- **AI-Generated Questions**: On-demand generation of additional practice questions tailored to lesson content

### AI-Powered Assistance
- **Contextual AI Tutor**: Conversational assistant providing lesson-specific guidance and explanations
- **Token-Based Usage System**: Managed quota system to control AI resource consumption
- **Real-time Feedback**: Immediate responses to student queries about database concepts

### Progress Tracking
- **Lesson Completion Tracking**: Persistent storage of student progress across modules
- **Visual Progress Indicators**: Module-level and overall completion statistics
- **User Authentication**: Secure account management via Supabase authentication

### User Experience
- **Responsive Design**: Mobile-first interface optimized for various screen sizes
- **Dark Mode Support**: Theme toggle for improved accessibility and user preference
- **Intuitive Navigation**: Sidebar-based course directory with clear lesson organization

## Technologies Used

### Frontend
- **React 18.3**: Component-based UI framework
- **TypeScript**: Type-safe development environment
- **Vite**: Modern build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent visual elements
- **React Router**: Client-side routing for single-page application navigation
- **React Markdown**: Rendering of lesson content from markdown files
- **React Syntax Highlighter**: Code syntax highlighting for SQL examples

### Backend
- **Supabase**: Backend-as-a-Service platform providing:
  - PostgreSQL database for application data
  - Row-Level Security (RLS) for data access control
  - Authentication and user management
  - Serverless edge functions for business logic
- **Deno Runtime**: Secure TypeScript/JavaScript runtime for edge functions
- **OpenAI API**: GPT-5-Mini model integration for AI tutoring and question generation

### Development Tools
- **ESLint**: Code quality and style enforcement
- **npm Workspaces**: Monorepo management for frontend applications
- **Vercel**: Deployment platform for frontend hosting

### External Services
- **Oracle Autonomous Database**: Cloud-based Oracle database for SQL practice sandbox
- **Oracle REST Data Services (ORDS)**: RESTful API interface for sandbox database access

## Project Structure

```
datamentor/
├── app/                          # Frontend application
│   └── web/                      # React web application
│       ├── src/
│       │   ├── components/       # Reusable React components
│       │   ├── features/         # Feature-specific components
│       │   ├── pages/            # Route-level page components
│       │   ├── repository/       # Data access layer
│       │   ├── services/         # Business logic and API clients
│       │   ├── contexts/         # React context providers
│       │   ├── hooks/            # Custom React hooks
│       │   ├── i18n/             # Internationalization resources
│       │   └── types/            # TypeScript type definitions
│       └── public/               # Static assets
│
├── modules/                      # Educational content
│   ├── module_1/                 # Database fundamentals
│   ├── module_2/                 # SQL basics
│   ├── module_3/                 # Data modeling
│   ├── module_4/                 # Advanced queries
│   ├── module_5/                 # Performance optimization
│   └── module_6/                 # Non-relational databases
│
├── sandbox_db/                   # Oracle sandbox database schema
│   └── schema.sql                # Table definitions and seed data
│
└── supabase/                     # Backend infrastructure
    ├── functions/                # Serverless edge functions
    │   ├── ai-questions/         # AI question generation endpoint
    │   ├── ai-usage/             # Usage quota management
    │   ├── tutor/                # AI tutoring endpoint
    │   ├── sbx-exec/             # Sandbox query execution
    │   ├── sbx-start/            # Sandbox initialization
    │   ├── sbx-reset/            # Sandbox reset functionality
    │   ├── _shared/              # Shared utilities and constants
    │   ├── repository/           # Database access layer
    │   └── services/             # Business logic services
    └── migrations/               # Database schema migrations
```

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase account
- Oracle Cloud account with Autonomous Database
- OpenAI API key

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Installation

```bash
# Install dependencies
npm install

# Navigate to web application
cd app/web
npm install
```

### Development

```bash
# Start development server
npm run dev:web

# Build for production
npm run build:web
```

### Database Setup

1. Apply Supabase migrations:
   - Migrations are located in `supabase/migrations/`
   - Execute migrations in numerical order

2. Configure Oracle Autonomous Database:
   - Execute `sandbox_db/schema.sql` to create sandbox schema
   - Configure ORDS for REST API access

## Academic Context

This project was developed as part of the Project for Master's course at Polytechnic University of Puerto Rico. The platform demonstrates the integration of modern web technologies, cloud services, and artificial intelligence to create an effective educational tool. The research focuses on leveraging AI-assisted learning to improve database education outcomes while maintaining resource efficiency through managed usage quotas.

## License

This project is developed for academic purposes as part of a Master's degree program at Polytechnic University of Puerto Rico.
