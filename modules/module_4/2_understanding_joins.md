# Lesson 2: Understanding Joins (INNER, LEFT, RIGHT, FULL)

## Learning Objectives
- Understand the purpose of `JOIN` operations.
- Differentiate between INNER, LEFT, RIGHT, and FULL joins.
- Write queries combining data from multiple tables.

## Explanation
Joins allow you to combine rows from two or more tables based on related columns:
- **INNER JOIN:** returns matching rows in both tables.
- **LEFT JOIN:** all rows from the left table, plus matches from the right.
- **RIGHT JOIN:** all rows from the right table, plus matches from the left.
- **FULL JOIN:** all rows from both tables, matched where possible.

## Example
```sql
SELECT Students.name, Courses.title
FROM Students
INNER JOIN Enrollments ON Students.student_id = Enrollments.student_id
INNER JOIN Courses ON Enrollments.course_id = Courses.course_id;
```

## Practice Questions
1. Write a query to list all students and their courses using an INNER JOIN.
2. Use a LEFT JOIN to show all students, even if they have no courses.

## Key Takeaways
Joins are essential for querying data across multiple tables, enabling flexible reports and analysis.