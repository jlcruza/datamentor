# Lesson 1: Why Data Modeling Matters

## Learning Objectives
- Understand the purpose of data modeling in databases.
- Recognize the risks of poor data design.
- Appreciate how models guide implementation.

## Explanation
Data modeling is the process of defining how data is structured and related in a database. A good model makes the database easier to use, more efficient, and scalable. Without proper modeling, databases can suffer from redundancy, inconsistency, and poor performance.

## Example
- Poor design: storing customer address inside every order record (repetition).
- Good design: separating *Customers* and *Orders* into different tables and linking them with a key.

## Practice Questions
1. Why is data modeling necessary before creating tables?
2. Give an example of redundant data storage.

## Key Takeaways
Data modeling prevents inefficiency and errors by creating a clear structure for data relationships.
