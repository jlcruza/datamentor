# Lesson 4: Common Table Expressions (CTEs) Basics

## Learning Objectives
Understand what a CTE is.
Learn the syntax of WITH.
Use CTEs to simplify complex queries.

## Explanation
A CTE (Common Table Expression) is a temporary result set defined with WITH that you can reference in later queries. They improve readability for complex queries.

## Example
```sql
WITH HighGPA AS (
SELECT name, gpa
FROM Students
WHERE gpa > 3.5
)
SELECT * FROM HighGPA;
```

## Practice Questions
1. Write a CTE that finds courses with more than 2 enrollments.
2. Why might a CTE be preferred over a nested subquery?

## Key Takeaways
CTEs make complex queries easier to read, reuse, and maintain.
