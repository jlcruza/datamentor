# Lesson 4: Primary and Foreign Keys Explained

## Learning Objectives
- Define primary and foreign keys.
- Understand their role in enforcing relationships.
- Identify keys in a schema.

## Explanation
A **primary key** uniquely identifies each row in a table.  
A **foreign key** references the primary key of another table, establishing a relationship.

## Example
**Students Table**

| student_id (PK) | name  |
|-----------------|-------|
| 1               | Alice |
| 2               | Bob   |

**Enrollments Table**

| enrollment_id | student_id (FK) | course_id |
|---------------|-----------------|-----------|
| 101           | 1               | C101      |

## Practice Questions
1. What is the difference between a primary key and a foreign key?
2. In an `Orders` table, which attribute would likely be a foreign key?

## Key Takeaways
Primary keys enforce uniqueness; foreign keys establish relationships between tables.
