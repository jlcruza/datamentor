# Lesson 1: Introduction to SQL and Basic Syntax

## Learning Objectives
- Understand what SQL is and its role in databases.
- Recognize the structure of a simple SQL statement.
- Learn the difference between keywords, clauses, and expressions.

## Explanation
**SQL (Structured Query Language)** is the standard language used to interact with relational databases. It allows you to create, read, update, and delete data (CRUD operations). SQL commands are written as **statements**, usually ending with a semicolon.

A basic SQL query has the following structure:
```sql
SELECT column_list
FROM table_name
WHERE condition;
```

Example

```sql
SELECT name, gpa
FROM Students
WHERE gpa > 3.0;
```

## Practice Questions
1. What does SQL stand for?
2. Which SQL command is used to retrieve data?
3. Write a query to select all columns from a table called Employees.

## Key Takeaways
SQL is the universal language for interacting with relational databases, using simple and structured commands.
