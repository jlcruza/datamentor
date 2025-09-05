# Lesson 3: Reading Query Execution Plans

## Learning Objectives
- Learn what a query execution plan is.
- Understand how the DBMS chooses execution strategies.
- Identify performance bottlenecks.

## Explanation
A **query execution plan** shows how the database will execute a SQL statement, including which indexes are used, join methods, and estimated costs. By analyzing execution plans, developers can tune queries for better performance.

## Example
```sql
EXPLAIN SELECT * FROM Students WHERE gpa > 3.5;
```
The output shows whether an index is used or if a full table scan occurs.

## Practice Questions
1. What does a query execution plan tell you about performance?
2. Why might a query run slowly even if indexes exist?

## Key Takeaways
Execution plans are diagnostic tools for understanding and improving query performance.
