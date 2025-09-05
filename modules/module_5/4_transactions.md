# Lesson 4: Transactions: BEGIN, COMMIT, ROLLBACK

## Learning Objectives
Understand what transactions are and why they are important.
Learn how to group SQL statements into atomic operations.
Use COMMIT and ROLLBACK effectively.

## Explanation
A transaction is a unit of work that is executed as a whole. If one step fails, the entire transaction should fail. Transactions follow the ACID properties: Atomicity, Consistency, Isolation, Durability.

### Commands:
`BEGIN` → start transaction
`COMMIT` → save changes
`ROLLBACK` → undo changes

## Example
```sql
BEGIN;

UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```
If an error occurs, use `ROLLBACK` to undo.

## Practice Questions
1. What happens if a transaction is not committed?
2. Why are transactions important for banking systems?

## Key Takeaways
Transactions ensure data integrity by grouping multiple statements into one reliable operation.
