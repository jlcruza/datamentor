# Learning Modules

## Overview

This directory contains the educational content for DataMentor's database curriculum. All lessons are authored in Markdown format, enabling version control, easy editing, and consistent rendering across the platform. The content is structured into six progressive modules covering fundamental to advanced database concepts.

## Curriculum Structure

### Module 1: Database Fundamentals
Introduction to core database concepts and terminology.

- `1_what_is_a_database.md` - Definition and purpose of databases
- `2_data_in_everyday_life.md` - Real-world applications of data management
- `3_database_management_systems.md` - Overview of DBMS types and functions
- `4_tables_columns_rows.md` - Basic relational database structure
- `5_keys_and_identifiers.md` - Primary keys, foreign keys, and unique identifiers

### Module 2: SQL Basics
Fundamental SQL operations for data manipulation and retrieval.

- `1_introduction_to_sql.md` - SQL language overview and syntax
- `2_tables_and_data_types.md` - Creating tables and choosing appropriate data types
- `3_crud_create_and_update.md` - INSERT and UPDATE operations
- `4_crud_read.md` - SELECT statements and data retrieval
- `5_crud_delete.md` - DELETE operations and data removal
- `6_where_clause.md` - Filtering results with WHERE conditions
- `7_sorting_results.md` - ORDER BY and sorting strategies
- `8_aggregation_functions.md` - COUNT, SUM, AVG, MIN, MAX functions
- `9_grouping_and_filtering.md` - GROUP BY and HAVING clauses

### Module 3: Data Modeling
Designing effective database schemas and relationships.

- `1_why_data_modeling_matters.md` - Importance of proper database design
- `2_entities_and_attributes.md` - Identifying entities and their properties
- `3_relationships_between_tables.md` - One-to-one, one-to-many, many-to-many relationships
- `4_primary_and_foreign_keys.md` - Key constraints and referential integrity
- `5_entity_relationship_diagrams.md` - ERD notation and modeling techniques
- `6_normalization.md` - Normal forms and reducing redundancy

### Module 4: Advanced Queries
Complex query techniques for sophisticated data retrieval.

- `1_working_with_multiple_tables.md` - Introduction to multi-table queries
- `2_understanding_joins.md` - INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN
- `3_using_subqueries.md` - Nested SELECT statements and correlated subqueries
- `4_common_table_expressions.md` - WITH clauses and recursive CTEs
- `5_creating_and_using_views.md` - Virtual tables and query simplification
- `6_introduction_to_stored_procedures.md` - Encapsulating business logic

### Module 5: Performance and Optimization
Query optimization and database performance tuning.

- `1_what_are_indexes.md` - Index fundamentals and benefits
- `2_types_of_indexes.md` - B-tree, hash, bitmap, and composite indexes
- `3_query_execution_plans.md` - Understanding EXPLAIN and query analysis
- `4_transactions.md` - ACID properties and transaction management
- `5_concurrency_and_isolation_levels.md` - Handling concurrent database access
- `6_performance_tuning.md` - Strategies for optimizing database performance

### Module 6: Non-Relational Databases
Introduction to NoSQL databases and alternative data models.

- `1_introduction_to_non-relational_databases.md` - NoSQL overview and motivation
- `2_types_of_nosql_databases.md` - Document, key-value, columnar, and graph databases
- `3_when_to_use_nosql.md` - Use cases and selection criteria
- `4_handling_unstructured_data.md` - Working with flexible schemas
- `5_scalability_and_performance.md` - Horizontal scaling and distributed systems

## Content Format

All lesson files follow a consistent Markdown structure:

```markdown
# Lesson Title

Brief introduction to the topic.

## Concept Section
Explanation of concepts with examples.

## Code Examples
```sql
-- SQL code examples with comments
SELECT * FROM example_table;
```

## Key Takeaways
- Important points to remember
- Core concepts summarized

## Practice Considerations
Guidance for applying concepts in practice exercises.
```

## Content Guidelines

### Pedagogical Approach
- **Progressive Complexity**: Lessons build on previous knowledge
- **Practical Examples**: Real-world scenarios and sample data
- **Clear Explanations**: Academic yet accessible language
- **Visual Support**: Code examples demonstrate concepts concretely

### Writing Style
- Academic tone appropriate for graduate-level study
- Clear, concise explanations avoiding unnecessary jargon
- Consistent terminology aligned with industry standards
- Examples using the sandbox database schema (students, courses, departments, enrollments)

### Code Examples
- All SQL code must be syntactically correct
- Include comments explaining complex operations
- Use formatting consistent with SQL best practices
- Examples should be executable in the Oracle sandbox environment

## Integration with Platform

### Lesson Loading
The frontend application dynamically loads lesson content based on metadata stored in the Supabase database. Each lesson record contains a `content_path` field that references the corresponding Markdown file in this directory.

### Content Rendering
Lessons are rendered using React Markdown with GitHub Flavored Markdown extensions and syntax highlighting for SQL code blocks.

### Practice Exercises
While lesson content resides in Markdown files, associated practice exercises are stored in the Supabase database and linked to lessons via `lesson_id` foreign keys.

## Adding New Lessons

To add a new lesson to the curriculum:

1. Create a new Markdown file in the appropriate module directory following the naming convention: `[number]_[lesson_name].md`

2. Add a corresponding record to the Supabase `lessons` table:
   ```sql
   INSERT INTO lessons (lesson_id, lesson_name, description, module_id, difficulty_id, content_path)
   VALUES (
     [next_id],
     'Lesson Title',
     'Brief description',
     [module_id],
     [difficulty_id],
     'modules/module_[n]/[number]_[lesson_name].md'
   );
   ```

3. Optionally add practice exercises to the `practice_exercises` table linked to the new lesson.

## Content Maintenance

- Keep content synchronized with database schema changes
- Review examples to ensure compatibility with sandbox environment
- Update lessons when introducing new platform features
- Maintain consistency in terminology across all modules

## Internationalization

Currently, lesson content is authored in English. Future enhancements may include:
- Spanish language translations
- Language-specific content directories
- Dynamic content selection based on user preferences
