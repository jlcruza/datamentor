# Lesson 1: What Are Indexes and Why Do They Matter?

## Learning Objectives
- Understand the purpose of indexes in databases.
- Learn how indexes speed up queries.
- Recognize trade-offs of using indexes.

## Explanation
An **index** is a database structure that improves the speed of data retrieval operations. It works like the index of a book—helping the system locate information without scanning every page (or row). While indexes improve read performance, they can slow down writes (`INSERT`, `UPDATE`, `DELETE`) because the index must also be updated.

## Example
```sql
CREATE INDEX idx_students_gpa
ON Students (gpa);
```
This index speeds up queries filtering by GPA.

## Practice Questions
1. Why does adding an index improve performance for queries?
2. When might too many indexes be a problem?

## Key Takeaways
Indexes make queries faster but add overhead to data modifications—balance is essential.
