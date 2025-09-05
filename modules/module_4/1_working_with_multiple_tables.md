# Lesson 1: Working with Multiple Tables

## Learning Objectives
- Learn why multiple tables are needed in a database.
- Understand how related data is stored across tables.
- Practice combining data from different tables.

## Explanation
In real-world databases, data is rarely kept in a single table. Instead, multiple tables are used to avoid redundancy and enforce relationships. Queries often need to retrieve information from more than one table at the same time.

## Example
**Students Table**

| student_id | name   |
|------------|--------|
| 1          | Alice  |
| 2          | Bob    |

**Courses Table**

| course_id | title          |
|-----------|----------------|
| C101      | Databases      |
| C102      | Programming    |

**Enrollments Table**

| student_id | course_id |
|------------|-----------|
| 1          | C101      |
| 2          | C102      |

## Practice Questions
1. Why is it better to use multiple tables instead of one “big” table?
2. Which table would store the grade a student received for a course?

## Key Takeaways
Multiple tables reduce redundancy and allow flexible, accurate data relationships.
