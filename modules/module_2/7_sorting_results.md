# Lesson 7: Sorting Results with ORDER BY

## Learning Objectives
- Sort results in ascending or descending order.
- Understand default sort behavior.
- Combine sorting with filtering.

## Explanation
The `ORDER BY` clause sorts query results. Default is ascending (`ASC`), but you can specify descending (`DESC`).

## Example
```sql
SELECT name, gpa
FROM Students
ORDER BY gpa DESC;
```

## Practice Questions
1. Write a query to order students alphabetically by name.
2. Sort students by enrollment date, oldest to newest.

## Key Takeaways
`ORDER BY` organizes query output for easier interpretation.
