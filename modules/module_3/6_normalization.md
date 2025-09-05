# Lesson 6: Normalization (1NF, 2NF, 3NF)

## Learning Objectives
- Understand what normalization is.
- Learn the steps from 1NF to 3NF.
- Apply normalization to reduce redundancy.

## Explanation
**Normalization** is the process of organizing data to reduce redundancy and improve integrity:
- **1NF:** Eliminate repeating groups; make sure values are atomic.
- **2NF:** Eliminate partial dependency on part of a composite key.
- **3NF:** Eliminate transitive dependency (non-key attributes depending on other non-key attributes).

## Example
Unnormalized Table:

| Student | Course1 | Course2 |
|---------|---------|---------|

→ Normalized into separate *Students* and *Enrollments* tables.

## Practice Questions
1. What problems does normalization solve?
2. Normalize a table that stores multiple phone numbers in one column.

## Key Takeaways
Normalization reduces redundancy, avoids anomalies, and ensures reliable data structures.
