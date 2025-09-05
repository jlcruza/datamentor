# Lesson 6: Introduction to Stored Procedures

## Learning Objectives
Learn what stored procedures are.
Understand why procedures improve efficiency.
Create and execute a simple stored procedure.

## Explanation
A stored procedure is a precompiled SQL program stored in the database. It can perform operations such as inserting, updating, or processing data. Benefits include efficiency, reusability, and security.

## Example
```sql
CREATE PROCEDURE AddStudent (
IN sid INT,
IN sname VARCHAR(50),
IN sgpa DECIMAL(3,2)
)
AS
BEGIN
INSERT INTO Students (id, name, gpa)
VALUES (sid, sname, sgpa);
END;
```

## Practice Questions
1. Write a stored procedure that adds a new enrollment for a student.
2. What are two advantages of using stored procedures?

## Key Takeaways
Stored procedures allow developers to encapsulate logic inside the database, improving performance and security.
