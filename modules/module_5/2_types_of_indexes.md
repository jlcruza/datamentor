# Lesson 2: Types of Indexes: Clustered vs. Non-Clustered

## Learning Objectives
- Differentiate between clustered and non-clustered indexes.
- Recognize when to use each type.
- Understand the effect of clustered indexes on data storage.

## Explanation
- **Clustered index**: determines the physical order of data in a table (one per table). Example: primary key index.
- **Non-clustered index**: separate structure that references rows, allowing multiple per table.
Clustered indexes are faster for retrieving ranges, while non-clustered indexes help with searches on non-key columns.

## Example
```sql
-- Clustered (usually default for PK)
CREATE CLUSTERED INDEX idx_students_id ON Students(id);

-- Non-clustered
CREATE NONCLUSTERED INDEX idx_students_name ON Students(name);
```

## Practice Questions
1. What is the main difference between a clustered and non-clustered index?
2. Why can there only be one clustered index per table?

## Key Takeaways
Clustered indexes define table order, while non-clustered indexes provide flexibility for additional queries.
