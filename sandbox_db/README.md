# Sandbox Database Schema

## Overview

This directory contains the SQL schema and seed data for the DataMentor practice sandbox environment. The sandbox provides students with a safe, isolated Oracle Autonomous Database instance where they can execute SQL queries, experiment with database operations, and practice concepts learned in lessons without risk of data corruption or interference with other users.

## Database Platform

**Oracle Autonomous Database** is a cloud-based, self-managing database service that provides:
- Automatic indexing and query optimization
- Built-in security features
- Self-healing capabilities
- Elastic scaling
- REST API access via Oracle REST Data Services (ORDS)

## Schema Structure

The sandbox database implements a simplified university management system with four interconnected tables representing a realistic relational database scenario. This schema is designed to support a wide range of SQL learning exercises from basic SELECT statements to complex multi-table joins.

### Tables

#### DEPARTMENTS
Represents academic departments within the university.

**Columns:**
- `id` (NUMBER, PRIMARY KEY): Unique department identifier
- `name` (VARCHAR2(100), NOT NULL, UNIQUE): Department name
- `head` (VARCHAR2(100)): Department head name
- `budget` (NUMBER(12,2)): Annual budget allocation
- `building` (VARCHAR2(100)): Building location

**Sample Data:** 3 departments (Computer Science, Mathematics, Physics)

#### STUDENTS
Stores student information and academic enrollment details.

**Columns:**
- `id` (NUMBER, PRIMARY KEY): Unique student identifier
- `name` (VARCHAR2(100), NOT NULL): Student full name
- `email` (VARCHAR2(255), NOT NULL, UNIQUE): Student email address
- `major_id` (NUMBER, FOREIGN KEY): References DEPARTMENTS(id)
- `age` (NUMBER(3)): Student age
- `enrollment_date` (DATE, NOT NULL): Date of enrollment

**Constraints:**
- Foreign key to DEPARTMENTS with ON DELETE SET NULL
- Email must be unique

**Sample Data:** 8 students with various majors and enrollment dates

#### COURSES
Defines academic courses offered by departments.

**Columns:**
- `id` (NUMBER, PRIMARY KEY): Unique course identifier
- `title` (VARCHAR2(200), NOT NULL): Course title
- `credits` (NUMBER(2), NOT NULL): Credit hours
- `department_id` (NUMBER, FOREIGN KEY): References DEPARTMENTS(id)
- `instructor` (VARCHAR2(100)): Instructor name

**Constraints:**
- Foreign key to DEPARTMENTS with ON DELETE SET NULL

**Sample Data:** 7 courses spanning multiple departments

#### ENROLLMENTS
Junction table implementing the many-to-many relationship between students and courses.

**Columns:**
- `id` (NUMBER, PRIMARY KEY): Unique enrollment identifier
- `student_id` (NUMBER, NOT NULL, FOREIGN KEY): References STUDENTS(id)
- `course_id` (NUMBER, NOT NULL, FOREIGN KEY): References COURSES(id)
- `grade` (NUMBER(5,2)): Numerical grade (0-100)
- `semester` (VARCHAR2(50), NOT NULL): Semester designation
- `enrollment_date` (DATE, NOT NULL): Date of course enrollment

**Constraints:**
- Foreign key to STUDENTS with ON DELETE CASCADE
- Foreign key to COURSES with ON DELETE CASCADE
- Unique constraint on (student_id, course_id, semester)

**Sample Data:** 13 enrollment records representing various student-course relationships

## Database User

The schema is owned by the `SBX_OWNER` user, which is created with minimal privileges:

```sql
CREATE USER SBX_OWNER IDENTIFIED BY ""
  QUOTA 200M ON DATA;

GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE,
    CREATE PROCEDURE, CREATE TRIGGER TO SBX_OWNER;
```

This restricted user ensures students cannot perform destructive operations outside the intended sandbox scope.

## Relationships

The schema demonstrates three common relational database patterns:

1. **One-to-Many: DEPARTMENTS → STUDENTS**
   - Each department can have multiple students (major_id)
   - Each student belongs to at most one department

2. **One-to-Many: DEPARTMENTS → COURSES**
   - Each department offers multiple courses (department_id)
   - Each course belongs to one department

3. **Many-to-Many: STUDENTS ↔ COURSES (via ENROLLMENTS)**
   - Students can enroll in multiple courses
   - Courses can have multiple students
   - ENROLLMENTS junction table stores additional attributes (grade, semester)

## Sample Data Characteristics

The seed data is carefully designed to support diverse learning exercises:

- **Variety in Relationships**: Students enrolled in different numbers of courses
- **Cross-Department Enrollments**: Students taking courses outside their major
- **Realistic Values**: Grades ranging from 85.5 to 96.5, realistic enrollment dates
- **Sufficient Volume**: Enough records to demonstrate aggregation, filtering, and joining
- **Edge Cases**: Intentional variations to teach NULL handling, constraint violations

## Usage in DataMentor

### Sandbox Lifecycle

1. **Initialization**: When a student first accesses the query practice feature, the backend initializes a sandbox session
2. **Query Execution**: Students submit SQL queries via the frontend, which are proxied through Supabase Edge Functions to ORDS
3. **Results Display**: Query results are returned as JSON and rendered in the frontend
4. **Reset**: Students can reset their sandbox to restore the original schema and data

### Supported Operations

Students can practice:
- SELECT queries (simple and complex)
- WHERE filtering and conditional logic
- JOIN operations across multiple tables
- Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
- GROUP BY and HAVING clauses
- Subqueries and nested SELECT statements
- ORDER BY sorting
- DISTINCT and set operations

### Restrictions

For security and resource management:
- DDL operations (CREATE, ALTER, DROP) are restricted
- DML operations (INSERT, UPDATE, DELETE) are allowed but reverted on reset
- Transaction control is managed by the system
- Query execution timeout prevents long-running queries

## Installation

### Prerequisites
- Oracle Cloud account with Autonomous Database provisioned
- Database administrator access
- Oracle SQL Developer or equivalent client

### Deployment Steps

1. Connect to Oracle Autonomous Database as administrator
2. Execute `schema.sql` to create user, tables, and seed data:
   ```bash
   sqlplus admin@[connection_string] @schema.sql
   ```
3. Configure Oracle REST Data Services (ORDS) to enable REST API access
4. Grant appropriate ORDS privileges to `SBX_OWNER`
5. Update Supabase Edge Functions with ORDS connection details

## Maintenance

### Adding Tables or Columns
When extending the schema:
1. Update `schema.sql` with new DDL statements
2. Add corresponding seed data
3. Update DataMentor lesson content to reference new schema elements
4. Reset existing sandbox sessions to apply changes

### Modifying Sample Data
To update seed data:
1. Modify INSERT statements in `schema.sql`
2. Ensure referential integrity is maintained
3. Verify data supports intended learning exercises
4. Re-run initialization for affected sandboxes

## Security Considerations

- **User Isolation**: Each student operates within a separate database session
- **Privilege Restriction**: `SBX_OWNER` has minimal privileges preventing system modifications
- **Query Sanitization**: All SQL inputs are validated before execution
- **Resource Limits**: Query execution timeouts and result set size limits prevent abuse
- **Audit Logging**: ORDS can be configured to log all sandbox queries for analysis

## Educational Design Rationale

The university management domain was selected because:
- **Familiarity**: Students readily understand the relationships between students, courses, and departments
- **Realistic Complexity**: Sufficient complexity to teach advanced concepts without overwhelming beginners
- **Diverse Query Types**: Schema supports simple lookups, aggregations, joins, and analytical queries
- **Extensibility**: Easy to add tables (e.g., professors, classrooms) for advanced lessons
- **Industry Relevance**: Mirrors real-world database design patterns

## Future Enhancements

Potential schema expansions:
- PROFESSORS table with course assignments
- CLASSROOMS table with scheduling constraints
- PREREQUISITES table for course dependencies
- TEXTBOOKS table with course materials
- GRADES_HISTORY table for temporal data modeling exercises
