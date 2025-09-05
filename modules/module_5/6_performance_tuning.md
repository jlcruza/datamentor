# Lesson 6: Performance Tuning Best Practices

## Learning Objectives
- Learn strategies for writing efficient queries.
- Recognize common pitfalls that slow down performance.
- Apply optimization techniques.

## Explanation
Some best practices for performance:
- Avoid SELECT *; specify needed columns.
- Use indexes wisely.
- Limit rows with WHERE.
- Normalize data appropriately.
- Monitor execution plans for expensive operations.

## Example
Bad query:
```sql
SELECT * FROM Students;
```
Optimized query:
```sql
SELECT name, gpa FROM Students WHERE gpa > 3.5;
```

## Practice Questions
1. Why is SELECT * discouraged in production queries?
2. Give two strategies to improve query performance.

## Key Takeaways
Efficient queries reduce resource usage, save costs, and improve user experience.
