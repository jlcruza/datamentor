# Lesson 2: Creating Tables and Defining Data Types

## Learning Objectives
- Learn how to create a new table in SQL.
- Understand common SQL data types.
- Define columns with appropriate types and constraints.

## Explanation
The `CREATE TABLE` command is used to make a new table. Each column must be given a data type such as:
- `INT` → whole numbers
- `VARCHAR(n)` → variable-length text
- `DATE` → dates
- `DECIMAL(p,s)` → precise decimal numbers
Constraints like `PRIMARY KEY` and `NOT NULL` help enforce rules.

## Example
```sql
CREATE TABLE Students (
id INT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
gpa DECIMAL(3,2),
enrollment_date DATE
);
```

## Practice Questions
1. Create a table `Courses` with columns `course_id`, `title`, and `credits`.
2. Which data type would you use for: (a) a student’s name, (b) enrollment date, (c) GPA?

## Key Takeaways
Choosing the right data type ensures accurate, efficient, and reliable data storage.
