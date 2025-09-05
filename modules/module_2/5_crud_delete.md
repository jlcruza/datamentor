# Lesson 5: Deleting Records (CRUD: Delete)

## Learning Objectives
- Understand how to remove data from tables.
- Use the `DELETE` statement safely.
- Recognize the consequences of deleting rows.

## Explanation
The `DELETE` command removes rows. Always use a `WHERE` clause; otherwise, all rows in the table will be deleted.

### Example
```sql
DELETE FROM Students
WHERE id = 2;
```


## Practice Questions
1. Write a query to delete the student with `id = 3`.
2. What happens if you run `DELETE FROM Students;` with no condition?

## Key Takeaways
`DELETE` permanently removes data. Without `WHERE`, it deletes everything—use with caution.
