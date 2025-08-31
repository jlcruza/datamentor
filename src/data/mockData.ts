import type { User, Lesson } from '../App';

export const mockUser: User = {
  id: '1',
  email: 'student@example.com',
  name: 'John Smith'
};

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Databases',
    description: 'Learn the fundamental concepts of databases and why they are essential in modern applications.',
    content: `
## What is a Database?

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).
      
### Key Concepts:

- **Data:** Raw facts and figures
- **Information:** Processed data that has meaning
- **Database:** Collection of related data
- **DBMS:** Software that manages the database
      
### Why Use Databases?

1. **Data Organization:** Structured storage of information
2. **Data Integrity:** Ensures accuracy and consistency
3. **Data Security:** Controlled access and permissions
4. **Concurrent Access:** Multiple users can access simultaneously
5. **Data Recovery:** Backup and restore capabilities
      
### Types of Databases:

**Relational Databases:** Use tables with rows and columns (SQL databases)

**NoSQL Databases:** Use various data models (document, key-value, graph, etc.)
      
In this course, we'll focus primarily on relational databases and SQL.
    `,
    category: 'Database Fundamentals',
    difficulty: 'beginner',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Relational Database Model',
    description: 'Understanding tables, rows, columns, and relationships in relational databases.',
    content: `
## The Relational Database Model

The relational model organizes data into one or more tables (or "relations") of columns and rows, with a unique key identifying each row.
      
### Key Components:

- **Table (Relation):** A collection of related data entries
- **Row (Tuple):** A single record in a table
- **Column (Attribute):** A field in a table
- **Primary Key:** Unique identifier for each row
- **Foreign Key:** A field that refers to the primary key of another table
      
### Properties of Relations:

1. Each table has a unique name
2. Each column has a unique name within the table
3. Each row is unique
4. Order of rows and columns doesn't matter
5. Each cell contains a single value (atomic)
      
### Example: Student Database

**Students Table:**

| student_id | name | email | major |
|------------|------|-------|-------|
| 1 | Alice Johnson | alice@email.com | Computer Science |
| 2 | Bob Smith | bob@email.com | Mathematics |
      
Here, <code>student_id</code> is the primary key that uniquely identifies each student.
    `,
    category: 'Database Fundamentals',
    difficulty: 'beginner',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'SQL Basics - SELECT Statements',
    description: 'Learn how to retrieve data from databases using SQL SELECT statements.',
    content: `
## SQL SELECT Statement

The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.
      
### Basic Syntax:

\`\`\`sql
SELECT column1, column2, ...
FROM table_name;
\`\`\`
      
### SELECT All Columns:

\`\`\`sql
SELECT * FROM table_name;
\`\`\`
      
### Examples:
      
#### 1. Select specific columns:

\`\`\`sql
SELECT name, email FROM students;
\`\`\`
      
#### 2. Select all columns:

\`\`\`sql
SELECT * FROM students;
\`\`\`
      
#### 3. Using WHERE clause:

\`\`\`sql
SELECT name, major 
FROM students 
WHERE major = 'Computer Science';
\`\`\`
      
#### 4. Using ORDER BY:

\`\`\`sql
SELECT name, email 
FROM students 
ORDER BY name ASC;
\`\`\`
      
#### 5. Using LIMIT:

\`\`\`sql
SELECT * FROM students LIMIT 5;
\`\`\`
      
### Common WHERE Operators:

- \`=\` Equal
      
Practice these concepts in the Query Practice section!
    `,
    category: 'SQL Basics',
    difficulty: 'beginner',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Database Relationships',
    description: 'Understanding one-to-one, one-to-many, and many-to-many relationships between tables.',
    content: `
## Database Relationships

Relationships define how data in one table relates to data in another table. They are established through keys and are fundamental to relational database design.
      
### Types of Relationships:
      
#### 1. One-to-One (1:1)

Each record in Table A relates to exactly one record in Table B, and vice versa.

**Example:** Each person has one passport, and each passport belongs to one person.
      
#### 2. One-to-Many (1:M)

Each record in Table A can relate to multiple records in Table B, but each record in Table B relates to only one record in Table A.

**Example:** One customer can have many orders, but each order belongs to one customer.
      
#### 3. Many-to-Many (M:N)

Records in Table A can relate to multiple records in Table B, and vice versa. This requires a junction table.

**Example:** Students can enroll in multiple courses, and courses can have multiple students.
      
### Implementing Relationships:
      
#### Foreign Keys

A foreign key is a field (or collection of fields) that refers to the primary key of another table.
      
\`\`\`sql
-- Students table
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Courses table  
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    title VARCHAR(100),
    credits INT
);

-- Enrollments table (junction table for many-to-many)
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade DECIMAL(3,2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
\`\`\`
      
### Referential Integrity

Rules that ensure relationships between tables remain consistent:

- Cannot insert a foreign key value that doesn't exist in the referenced table
- Cannot delete a record that is referenced by a foreign key
- Cannot update a primary key that is referenced by foreign keys
      
Understanding relationships is crucial for effective database design and querying!
    `,
    category: 'Database Design',
    difficulty: 'intermediate',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    title: 'SQL JOINs',
    description: 'Master the art of combining data from multiple tables using different types of JOINs.',
    content: `
## SQL JOINs

JOINs are used to retrieve data from multiple tables based on a related column between them.
      
### Types of JOINs:
      
#### 1. INNER JOIN

Returns records that have matching values in both tables.

\`\`\`sql
SELECT students.name, courses.title
FROM students
INNER JOIN enrollments ON students.student_id = enrollments.student_id
INNER JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`
      
#### 2. LEFT JOIN (LEFT OUTER JOIN)

Returns all records from the left table, and matched records from the right table.

\`\`\`sql
SELECT students.name, courses.title
FROM students
LEFT JOIN enrollments ON students.student_id = enrollments.student_id
LEFT JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`
      
#### 3. RIGHT JOIN (RIGHT OUTER JOIN)

Returns all records from the right table, and matched records from the left table.

\`\`\`sql
SELECT students.name, courses.title
FROM students
RIGHT JOIN enrollments ON students.student_id = enrollments.student_id
RIGHT JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`
      
#### 4. FULL OUTER JOIN

Returns all records when there is a match in either left or right table.

\`\`\`sql
SELECT students.name, courses.title
FROM students
FULL OUTER JOIN enrollments ON students.student_id = enrollments.student_id
FULL OUTER JOIN courses ON enrollments.course_id = courses.course_id;
\`\`\`
      
### JOIN Best Practices:

- Always specify the JOIN condition
- Use table aliases for readability
- Be careful with OUTER JOINs and NULL values
- Consider performance implications
      
### Example with Aliases:

\`\`\`sql
SELECT s.name, c.title, e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
WHERE e.grade > 85
ORDER BY s.name;
\`\`\`
      
Practice JOINs with our sample database in the Query Practice section!
    `,
    category: 'SQL Advanced',
    difficulty: 'intermediate',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
];