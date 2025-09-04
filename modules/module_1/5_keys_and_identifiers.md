# Lesson 5: Keys and Identifiers: The Basics of Primary Keys

## Learning Objectives
- Define primary keys and why they are important.
- Understand how keys ensure data uniqueness.
- Identify real-world examples of primary keys.

## Explanation
A **primary key** is a column (or combination of columns) that uniquely identifies each record in a table. No two rows can share the same primary key. This prevents duplicate data and helps link related tables.

## Example
**Students Table with Primary Key (id)**

| id | name   | email             |
|----|--------|-------------------|
| 1  | Alice  | alice@email.com   |
| 2  | Bob    | bob@email.com     |

Here, the `id` is the primary key. Even if two students have the same name, their IDs will be unique.

## Practice Questions
1. Why must every table have a primary key?
2. Give two examples of real-world primary keys (e.g., passport number, student ID).
3. What problem might occur if a table had no primary key?

## Key Takeaways
Primary keys ensure uniqueness in a table and form the foundation for relationships between tables in relational databases.
