# Lesson 5: Creating and Using Views

## Learning Objectives
Define what a view is and why it is useful.
Create and query a view.
Recognize when to use views.

## Explanation
A view is a saved query that acts like a virtual table. It simplifies access to complex queries and provides security by hiding sensitive columns.

## Example
```sql
CREATE VIEW ActiveStudents AS
SELECT name, enrollment_date
FROM Students
WHERE enrollment_date >= '2023-01-01';
```

Querying the view:
```sql
SELECT * FROM ActiveStudents;
```

## Practice Questions
1. Create a view to list all students with GPA above 3.0.
2. Why might an instructor prefer using a view instead of giving direct access to a table?

## Key Takeaways
Views simplify repeated queries and can enhance security and maintainability.
