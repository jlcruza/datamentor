# Lesson 9: Grouping and Filtering with GROUP BY and HAVING

## Learning Objectives
- Group data based on column values.
- Apply aggregates to each group.
- Filter grouped results with `HAVING`.

## Explanation
`GROUP BY` groups rows into categories, while `HAVING` filters those groups.

## Example
```sql
SELECT enrollment_date, COUNT(*) AS num_students
FROM Students
GROUP BY enrollment_date
HAVING COUNT(*) > 1;
```


## Practice Questions
1. Group students by GPA and count how many have each GPA.
2. Show only GPA groups with more than 2 students.

## Key Takeaways
`GROUP BY` organizes data into sets, and `HAVING` filters those sets after aggregation.
