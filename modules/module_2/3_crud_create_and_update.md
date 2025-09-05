# Lesson 3: Inserting and Updating Data (CRUD: Create & Update)

## Learning Objectives
Insert new records into a table.
Update existing records safely.
Use `INSERT` and `UPDATE` effectively.

## Explanation
`INSERT` adds rows to a table, while `UPDATE` modifies existing records. Always use a `WHERE` clause with `UPDATE` to avoid accidental changes.

## Example

### Insert:
```sql
INSERT INTO Students (id, name, gpa, enrollment_date)
VALUES (1, 'Alice', 3.8, '2023-01-15');
```

### Update:
```sql
UPDATE Students
SET gpa = 3.9
WHERE id = 1;
```

## Practice Questions
1. Add a new student named “Carlos” with a GPA of 3.2.
2. Update Alice’s GPA to 4.0.

## Key Takeaways
`INSERT` and `UPDATE` enable you to manage table data, but updates must be scoped carefully to avoid unintended changes.
