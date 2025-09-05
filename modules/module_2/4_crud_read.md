# Lesson 4: Retrieving Data with SELECT (CRUD: Read)

## Learning Objectives
- Retrieve data from one or more columns.
- Use `SELECT *` vs. specific columns.
- Write simple `SELECT` queries.

## Explanation
The `SELECT` command retrieves rows from a table. You can either select all columns or specify which ones you need.


## Example
```sql
SELECT * FROM Students;

SELECT name, gpa
FROM Students;
```

## Practice Questions
1. Select only the `name` column from the `Students` table.
2. Write a query to select all columns from the `Courses` table.

## Key Takeaways
`SELECT` is the most commonly used SQL command, allowing precise control over which data you retrieve.
