# Lesson 3: Using Subqueries (Nested and Correlated)

## Learning Objectives
- Learn what subqueries are and when to use them.
- Differentiate between nested and correlated subqueries.
- Practice writing subqueries for filtering and calculations.

## Explanation
A subquery is a query inside another query.
Nested subquery: executed once, result used by outer query.
Correlated subquery: executed for each row in the outer query.

## Example
Find students with above-average GPA:
```sql
SELECT name, gpa
FROM Students
WHERE gpa > (SELECT AVG(gpa) FROM Students);
```

## Practice Questions
1. Write a query to find students enrolled in the course "Databases" using a subquery.
2. What is the main difference between a nested and a correlated subquery?

## Key Takeaways
Subqueries allow complex filtering and calculations within queries, making them powerful but sometimes less efficient.
