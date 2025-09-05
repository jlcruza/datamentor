# Lesson 7: When and Why to Denormalize

## Learning Objectives
- Understand the concept of denormalization.
- Recognize trade-offs between normalization and performance.
- Identify scenarios where denormalization helps.

## Explanation
**Denormalization** is the deliberate introduction of redundancy to improve performance. While normalization improves consistency, sometimes queries across too many joined tables can be slow. Denormalization balances speed with storage cost.

## Example
Instead of separating *Customer* and *Orders*, you might store a customer’s name inside the `Orders` table to speed up reports.

## Practice Questions
1. Why might denormalization improve query performance?
2. Give an example where denormalization could be useful.

## Key Takeaways
Denormalization improves speed at the cost of redundancy; it should be applied carefully when performance is a priority.
