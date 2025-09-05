# Lesson 8: Aggregation Functions

## Learning Objectives
- Use aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).
- Summarize data instead of returning individual rows.
- Apply aggregate functions with `WHERE`.

## Explanation
Aggregate functions perform calculations across multiple rows.

## Example
```sql
SELECT COUNT(*) AS total_students FROM Students;
SELECT AVG(gpa) AS average_gpa FROM Students;
```

## Practice Questions
1. Find the highest GPA in the class.
2. Count how many students are enrolled.

## Key Takeaways
Aggregate functions summarize large amounts of data into single values.
