# Supabase Backend

## Overview

This directory contains the backend infrastructure for DataMentor, built on Supabase's Backend-as-a-Service (BaaS) platform. The backend provides authentication, database management, serverless edge functions, and API endpoints supporting the platform's core functionality including AI tutoring, question generation, sandbox query execution, and student progress tracking.

## Architecture

The backend follows a serverless architecture using Supabase's integrated services:

- **PostgreSQL Database**: Stores application data (lessons, modules, exercises, student progress, AI usage)
- **Row-Level Security (RLS)**: Enforces fine-grained access control at the database level
- **Edge Functions**: Deno-based serverless functions handling business logic and external API integration
- **Authentication**: Built-in user management with email/password authentication
- **REST API**: Automatically generated REST endpoints for database tables

## Technology Stack

### Core Platform
- **Supabase**: Backend-as-a-Service providing PostgreSQL, authentication, and serverless functions
- **PostgreSQL**: Relational database with ACID compliance and JSON support
- **Deno Runtime**: Secure TypeScript/JavaScript runtime for edge functions

### External Integrations
- **OpenAI API**: GPT-5-Mini model for AI tutoring and question generation
- **Oracle REST Data Services (ORDS)**: REST API for Oracle Autonomous Database sandbox

## Project Structure

```
supabase/
├── functions/                    # Serverless edge functions
│   ├── ai-questions/             # AI-powered question generation
│   │   └── index.ts
│   ├── ai-usage/                 # Token usage quota management
│   │   └── index.ts
│   ├── tutor/                    # AI tutoring assistant
│   │   └── index.ts
│   ├── sbx-exec/                 # Sandbox query execution
│   │   └── index.ts
│   ├── sbx-start/                # Sandbox session initialization
│   │   └── index.ts
│   ├── sbx-reset/                # Sandbox reset to initial state
│   │   └── index.ts
│   ├── _shared/                  # Shared utilities and constants
│   │   ├── environment.ts        # Environment variable management
│   │   ├── oracle.ts             # Oracle database client
│   │   └── tables.ts             # Database table name constants
│   ├── repository/               # Data access layer
│   │   ├── dtos/                 # Data transfer objects
│   │   ├── aiSystemRepository.ts
│   │   ├── aiUsageRepository.ts
│   │   └── sandboxRepository.ts
│   ├── services/                 # Business logic layer
│   │   ├── dto/                  # Service-level DTOs
│   │   ├── aiUsageValidator.ts
│   │   ├── dataMentorResponse.ts
│   │   ├── openaiClient.ts
│   │   └── supabaseClient.ts
│   └── constants/                # Shared constants
│       └── httpResponseCodes.ts
│
├── migrations/                   # Database schema migrations
│   ├── 0001_init.sql
│   ├── 0002_add_exercises.sql
│   └── ...
│
└── config.toml                   # Supabase project configuration
```

## Database Schema

### Core Tables

#### difficulties
Defines difficulty levels for lessons.
- `difficulty_id` (INT, PK)
- `difficulty_name` (VARCHAR)
- Levels: principiante, intermedio, avanzado

#### modules
Organizes lessons into thematic groups.
- `module_id` (INT, PK)
- `module_name` (VARCHAR)

#### lessons
Stores lesson metadata and content references.
- `lesson_id` (INT, PK)
- `lesson_name` (VARCHAR)
- `description` (TEXT)
- `module_id` (INT, FK → modules)
- `difficulty_id` (INT, FK → difficulties)
- `content_path` (TEXT)

#### practice_exercises
Contains practice questions for lessons.
- `question_id` (INT, PK)
- `lesson_id` (INT, FK → lessons)
- `question` (TEXT)
- `options` (JSONB)
- `correct_answer_index` (INT)
- `reason` (TEXT)

#### progress
Tracks student lesson completion.
- `progress_id` (INT, PK)
- `student_id` (UUID, FK → auth.users)
- `lesson_id` (INT, FK → lessons)
- `completed` (BOOLEAN)
- Unique constraint: (student_id, lesson_id)

#### ai_usage
Monitors AI token consumption per student.
- `student_id` (UUID, PK, FK → auth.users)
- `total_input_token` (INT)
- `total_output_token` (INT)
- `billing_period` (VARCHAR)

#### ai_system
Defines system-wide AI usage limits.
- `id` (INT, PK)
- `monthly_input_tokens_limit` (INT)
- `monthly_output_tokens_limit` (INT)

### Row-Level Security (RLS)

All tables implement RLS policies ensuring:
- Students can only access their own progress data
- Students can only view their own AI usage statistics
- Lesson and exercise content is publicly readable but not modifiable by students
- AI usage limits are enforced at the database level

## Edge Functions

### ai-questions
Generates AI-powered practice questions using OpenAI's GPT-5-Mini model.

**Endpoint:** `POST /functions/v1/ai-questions`

**Request:**
```json
{
  "hint": "Introduction to SQL"
}
```

**Response:**
```json
[
  {
    "question": "What does SQL stand for?",
    "options": ["..."],
    "correct_answer_index": 2,
    "reason": "..."
  }
]
```

**Functionality:**
- Validates user authentication
- Checks AI usage quota against system limits
- Calls OpenAI API to generate contextual questions
- Records token usage in ai_usage table
- Returns generated questions as JSON

### tutor
Provides AI tutoring assistance for lesson-specific queries.

**Endpoint:** `POST /functions/v1/tutor`

**Request:**
```json
{
  "messages": [...],
  "lessonId": 1
}
```

**Response:** Streaming text response from GPT-5-Mini

**Functionality:**
- Authenticates user
- Validates usage quota
- Fetches lesson context
- Streams AI responses
- Tracks token consumption

### ai-usage
Retrieves current AI usage statistics for authenticated user.

**Endpoint:** `GET /functions/v1/ai-usage`

**Response:**
```json
{
  "usedTokens": 1500,
  "totalTokens": 10000,
  "percentageUsed": 15,
  "isUnderLimit": true
}
```

### sbx-exec
Executes SQL queries in Oracle sandbox environment.

**Endpoint:** `POST /functions/v1/sbx-exec`

**Request:**
```json
{
  "query": "SELECT * FROM students WHERE age > 20"
}
```

**Response:**
```json
{
  "items": [...],
  "count": 5
}
```

**Functionality:**
- Validates user authentication
- Sanitizes SQL input
- Proxies request to Oracle ORDS
- Returns query results or error messages

### sbx-start
Initializes sandbox session for authenticated user.

**Endpoint:** `POST /functions/v1/sbx-start`

**Functionality:**
- Creates or retrieves sandbox session
- Returns sandbox connection details

### sbx-reset
Resets sandbox to initial schema and data state.

**Endpoint:** `POST /functions/v1/sbx-reset`

**Functionality:**
- Validates user authentication
- Truncates and reseeds sandbox tables
- Returns confirmation

## Shared Components

### Repository Layer
Abstracts database operations with type-safe interfaces.

- **aiSystemRepository**: Retrieves AI system limits
- **aiUsageRepository**: Manages student token usage records
- **sandboxRepository**: Handles sandbox session management

### Service Layer
Encapsulates business logic and external service communication.

- **openaiClient**: Wrapper for OpenAI API calls
- **supabaseClient**: Authenticated Supabase client factory
- **aiUsageValidator**: Enforces usage quota rules
- **dataMentorResponse**: Standardized HTTP response formatting

### Utilities
- **environment.ts**: Centralized environment variable access
- **oracle.ts**: Oracle database connection management
- **tables.ts**: Database table name constants

## Configuration

### Environment Variables

Edge functions access the following environment variables automatically provided by Supabase:

- `SUPABASE_URL`: Project URL
- `SUPABASE_ANON_KEY`: Anonymous API key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (elevated privileges)
- `SUPABASE_DB_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key (configured in Supabase dashboard)

Additional custom variables:
- Oracle ORDS endpoint URLs
- Oracle database credentials

### CORS Configuration

All edge functions implement CORS headers to enable frontend requests:

```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};
```

## Database Migrations

Migrations are SQL files executed in sequence to create and modify database schema.

### Migration Naming Convention
`[number]_[description].sql`

Example: `0001_init.sql`

### Creating Migrations

1. Create new SQL file in `migrations/` directory
2. Add detailed comment block explaining changes:
   ```sql
   /*
     # Migration Title

     1. Description of changes
     2. Tables affected
     3. Security considerations
   */
   ```
3. Write SQL statements using idempotent patterns:
   ```sql
   CREATE TABLE IF NOT EXISTS ...
   ALTER TABLE IF EXISTS ...
   ```
4. Apply migration via Supabase CLI or dashboard

### Best Practices
- One logical change per migration
- Include rollback statements in comments
- Enable RLS on all new tables
- Create appropriate indexes
- Document security policies

## Development

### Prerequisites
- Supabase account and project
- Deno installed (for local function testing)
- PostgreSQL client (optional, for direct database access)

### Local Development

```bash
# Install Supabase CLI
npm install -g supabase

# Link to remote project
supabase link --project-ref [your-project-ref]

# Run edge functions locally
supabase functions serve

# Deploy edge function
supabase functions deploy [function-name]

# View function logs
supabase functions logs [function-name]
```

### Testing Edge Functions

```bash
# Test locally
curl -X POST http://localhost:54321/functions/v1/tutor \
  -H "Authorization: Bearer [anon-key]" \
  -H "Content-Type: application/json" \
  -d '{"messages": [...], "lessonId": 1}'
```

## Security

### Authentication
- All sensitive endpoints require authentication via Supabase Auth
- JWT tokens validated on each request
- Service role key used only for server-side operations

### Row-Level Security
- Every table has RLS enabled
- Policies enforce user isolation
- Foreign key relationships maintain referential integrity

### API Security
- Rate limiting on edge functions
- Input validation and sanitization
- SQL injection prevention via parameterized queries
- CORS restrictions in production

### Secrets Management
- API keys stored in Supabase project secrets
- Never committed to version control
- Accessed via environment variables

## Monitoring and Logging

### Function Logs
```bash
supabase functions logs [function-name] --limit 100
```

### Database Logs
Available through Supabase dashboard under Logs & Analytics

### Metrics
- Request counts
- Error rates
- Execution duration
- Token usage trends

## Deployment

### Edge Functions
Functions are deployed via Supabase CLI:

```bash
supabase functions deploy ai-questions
supabase functions deploy tutor
supabase functions deploy sbx-exec
```

### Database Changes
Migrations can be applied via:
- Supabase dashboard SQL Editor
- Supabase CLI migration commands
- Direct PostgreSQL connection

## Best Practices

### Edge Function Development
- Keep functions focused on single responsibility
- Use TypeScript for type safety
- Implement comprehensive error handling
- Log important events for debugging
- Validate all inputs
- Return consistent response formats

### Database Design
- Normalize data to avoid redundancy
- Use appropriate data types
- Index frequently queried columns
- Implement foreign key constraints
- Document complex queries
- Regularly analyze query performance

### Security
- Principle of least privilege
- Always enable RLS
- Validate and sanitize user inputs
- Use parameterized queries
- Rotate secrets regularly
- Audit security policies periodically

## Troubleshooting

### Common Issues

**Function timeout:**
- Check for long-running queries
- Optimize database queries
- Consider async processing for heavy operations

**Authentication errors:**
- Verify JWT token validity
- Check RLS policies
- Ensure proper authorization headers

**CORS errors:**
- Verify CORS headers in function response
- Check OPTIONS preflight handling
- Validate allowed origins

**Database connection issues:**
- Verify environment variables
- Check network connectivity
- Review connection pool settings

## Future Enhancements

Potential backend improvements:
- Caching layer for frequently accessed data
- Webhook support for external integrations
- Advanced analytics and reporting endpoints
- Real-time collaboration features via Supabase Realtime
- Automated backup and recovery procedures
- Multi-region deployment for improved latency
