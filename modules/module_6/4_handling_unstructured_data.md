# Lesson 4: Handling Unstructured Data

## Learning Objectives
- Define unstructured data.
- Understand how NoSQL databases store it.
- Explore real-world applications.

## Explanation
**Unstructured data** includes text, images, video, and logs that don’t fit neatly into tables. Document and key–value NoSQL databases are ideal for this type of information.

## Example
A MongoDB collection might store a JSON document with mixed attributes:
```json
{
  "username": "alice",
  "bio": "Loves data",
  "posts": [
    {"id": 1, "content": "Hello world"},
    {"id": 2, "content": "SQL vs NoSQL"}
  ]
}
```

## Practice Questions
1. What is unstructured data? Give an example.
2. Which type of NoSQL database handles JSON documents best?

## Key Takeaways
NoSQL databases handle unstructured data flexibly, making them ideal for modern applications like social networks and content platforms.
