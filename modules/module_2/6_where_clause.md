# Filtering Results with WHERE

## Learning Objectives
- Understand how the `WHERE` clause restricts rows in SQL queries.
- Learn to apply conditions using comparison and logical operators.
- Write queries that return only the data you need.

---

## Explanation
The `WHERE` clause in SQL allows you to filter rows from a table based on a condition. Without `WHERE`, a query will return **all rows**, which is often not useful. By applying conditions, you can focus on a subset of the data.

Conditions can use:
- **Comparison operators**: `=`, `!=`, `<`, `>`, `<=`, `>=`
- **Logical operators**: `AND`, `OR`, `NOT`
- **Special operators**: `BETWEEN`, `IN`, `LIKE`, `IS NULL`

---

## Example
Suppose we have a table named `Students`:

| id | name     | gpa | enrollment_date |
|----|----------|-----|-----------------|
| 1  | Alice    | 3.8 | 2023-01-15      |
| 2  | Bob      | 2.9 | 2022-09-01      |
| 3  | Charlie  | 3.4 | 2023-08-21      |
| 4  | Daniela  | 3.1 | 2021-05-11      |

### Example 1: Filtering by GPA
```sql
SELECT name, gpa
FROM Students
WHERE gpa > 3.0;
```

Result:

| name    | gpa |
| ------- | --- |
| Alice   | 3.8 |
| Charlie | 3.4 |
| Daniela | 3.1 |

### Example 2: Using AND
```sql
SELECT name, gpa
FROM Students
WHERE gpa > 3.0 AND enrollment_date >= '2023-01-01';
```

Result:

| name  | gpa |
| ----- | --- |
| Alice | 3.8 |

Practice Questions
1. Write a query to find all students with a GPA less than 3.0.
2. Retrieve the names of students enrolled before 2022-01-01.
3. Find all students whose names start with the letter 'C'.
