# Lesson 5: Scalability and Performance Considerations in NoSQL

## Learning Objectives
- Learn how NoSQL databases scale horizontally.
- Understand concepts of sharding and replication.
- Recognize performance trade-offs.

## Explanation
NoSQL databases are designed for horizontal scaling—adding more servers instead of relying on one big machine. Two key strategies:
- **Sharding**: Splitting data across servers.
- **Replication**: Copying data to multiple servers for reliability.
While scalability improves performance, some NoSQL databases relax consistency rules (the **CAP theorem**) to achieve it.

## Example
A global e-commerce site might shard customers by region and replicate data for availability.

## Practice Questions
1. What is the difference between sharding and replication?
2. Why might a NoSQL system sacrifice strict consistency?

## Key Takeaways
NoSQL databases achieve massive scalability and performance by distributing data, often trading off strict consistency for speed and availability.
