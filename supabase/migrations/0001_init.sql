CREATE TABLE IF NOT EXISTS difficulties(
    difficulty_id   INT             NOT NULL    PRIMARY KEY,
    difficulty_name VARCHAR(255)    NOT NULL,
    created_date    TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL    DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS modules(
    module_id       INT             NOT NULL    PRIMARY KEY,
    module_name     VARCHAR(255)    NOT NULL,
    created_date    TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL    DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS lessons(
    lesson_id       INT             NOT NULL    PRIMARY KEY,
    lesson_name     VARCHAR(255)    NOT NULL,
    description     VARCHAR(255)    NOT NULL,
    module_id       INT             REFERENCES  modules(module_id),
    difficulty_id   INT             REFERENCES  difficulties(difficulty_id),
    content_path    TEXT            NOT NULL,
    created_date    TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL    DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS progress(
    progress_id         SERIAL          PRIMARY KEY,
    student_id          UUID            NOT NULL    REFERENCES auth.users(id),
    lesson_id           INT             REFERENCES  lessons(lesson_id),
    completed           BOOLEAN         NOT NULL    DEFAULT FALSE,
    created_date        TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL    DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS exercises(
    exercise_id         SERIAL          PRIMARY KEY,
    lesson_id           INT             REFERENCES lessons(lesson_id),
    question            VARCHAR(255)    NOT NULL,
    reason              VARCHAR(255)    NOT NULL,
    created_date        TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL    DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS exercise_options(
    exercise_option_id  SERIAL          PRIMARY KEY,
    exercise_id         INT             REFERENCES exercises(exercise_id),
    text                VARCHAR(255)    NOT NULL,
    is_correct          BOOLEAN         NOT NULL        DEFAULT FALSE,
    created_date        TIMESTAMP       NOT NULL        DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL        DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS sandboxes(
    sandbox_id      SERIAL          PRIMARY KEY,
    student_id      UUID            NOT NULL        REFERENCES auth.users(id),
    oracle_username VARCHAR(25)     NOT NULL,
    oracle_password VARCHAR(32)     NOT NULL,
    expire_at       VARCHAR(255)    NOT NULL,
    is_active       BOOLEAN         NOT NULL        DEFAULT FALSE,
    created_date    TIMESTAMP       NOT NULL        DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL        DEFAULT NOW()
    );

CREATE VIEW learning_content AS
SELECT m.module_id, m.module_name, l.lesson_id, l.lesson_name, l.description, l.content_path, d.difficulty_id, d.difficulty_name, p.completed, p.student_id
FROM modules AS m
         INNER JOIN lessons AS l ON l.module_id = m.module_id
         INNER JOIN difficulties AS d ON d.difficulty_id = l.difficulty_id
         LEFT JOIN progress AS p ON p.lesson_id = l.lesson_id
WHERE p.student_id is NULL OR p.student_id = auth.uid();

INSERT INTO difficulties (difficulty_id, difficulty_name)
VALUES
    (1, 'beginner'),
    (2, 'intermediate'),
    (3, 'advanced');

INSERT INTO modules (module_id, module_name)
VALUES
    (1, 'Introduction to Databases'),
    (2, 'Core SQL Skills'),
    (3, 'Data Modeling and Design'),
    (4, 'Intermediate SQL'),
    (5, 'Advance SQL'),
    (6, 'About NoSQL');

-- Lessons for Module 1: Introduction to Databases
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, description, content_path)
VALUES
    (1, 'What is a database', 1, 1, 'Learn what a database is, why it exists, and how it organizes information more effectively than files.', 'module_1/1_what_is_a_database.md'),
    (2, 'Data in Everyday Life', 1, 1, 'See how databases compare to spreadsheets and when to use each.', 'module_1/2_data_in_everyday_life.md'),
    (3, 'Database Management Systems', 1, 1, 'Understand the role of DBMS software and the difference between relational and NoSQL systems.', 'module_1/3_database_management_systems.md'),
    (4, 'Tables, Columns, and Rows', 1, 1, 'Explore how data is structured in relational databases using rows and columns.', 'module_1/4_tables_columns_rows.md'),
    (5, 'Keys and Identifiers', 1, 1, 'Learn how primary keys ensure uniqueness and allow tables to link together.', 'module_1/5_keys_and_identifiers.md');

-- Exercises for Module 1: Introduction to Databases
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');


-- Lessons for Module 2: Core SQL Skills
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, description, content_path)
VALUES
    (6, 'Introduction to SQL', 2, 1, 'Get started with SQL by learning its purpose and structure.', 'module_2/1_introduction_to_sql.md'),
    (7, 'Tables and Data Types', 2, 1, 'Learn how to create tables and choose appropriate data types for columns.', 'module_2/2_tables_and_data_types.md'),
    (8, 'CRUD - Create & Update', 2, 1, 'Practice adding and modifying records in a database.', 'module_2/3_crud_create_and_update.md'),
    (9, 'CRUD - Read', 2, 1, 'Use the SELECT statement to pull data from your tables.', 'module_2/4_crud_read.md'),
    (10, 'CRUD - Delete', 2, 1, 'Safely remove records using the DELETE command.', 'module_2/5_crud_delete.md'),
    (11, 'WHERE Clause', 2, 1, 'Narrow down results by applying conditions with the WHERE clause.', 'module_2/6_where_clause.md'),
    (12, 'Sorting Results', 2, 1, 'Organize query results in ascending or descending order.', 'module_2/7_sorting_results.md'),
    (13, 'Aggregation Functions', 2, 1, 'Summarize data with functions like COUNT, AVG, and SUM.', 'module_2/8_aggregation_functions.md'),
    (14, 'Grouping and Filtering', 2, 1, 'Group rows into categories and filter groups with HAVING.', 'module_2/9_grouping_and_filtering.md');

-- Exercises for Module 2: Core SQL Skills
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 3: Data Modeling and Design
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, description, content_path)
VALUES
    (15, 'Why Data Modeling Matters', 3, 1, 'Learn why designing data structures is essential for efficiency and accuracy.', 'module_3/1_why_data_modeling_matters.md'),
    (16, 'Entities and Attributes', 3, 1, 'Understand entities (tables) and attributes (columns) as the building blocks of a database.', 'module_3/2_entities_and_attributes.md'),
    (17, 'Relationships Between Tables', 3, 1, 'Explore one-to-one, one-to-many, and many-to-many relationships.', 'module_3/3_relationships_between_tables.md'),
    (18, 'Primary and Foreign Keys', 3, 1, 'Discover how keys uniquely identify records and link tables.', 'module_3/4_primary_and_foreign_keys.md'),
    (19, 'Entity–Relationship Diagrams', 3, 1, 'Visualize database design with ER diagrams.', 'module_3/5_entity_relationship_diagrams.md'),
    (20, 'Normalization', 3, 1, 'Organize data to eliminate redundancy and improve integrity.', 'module_3/6_normalization.md'),
    (21, 'When and Why to Denormalize', 3, 1, 'Learn when denormalization can improve performance despite added redundancy.', 'module_3/7_when_and_why_to_denormalize.md');

-- Exercises for Module 3: Data Modeling and Design
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 4: Intermediate SQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, description, content_path)
VALUES
    (22, 'Working with Multiple Tables', 4, 2, 'Learn how to query across multiple tables in a database.', 'module_4/1_working_with_multiple_tables.md'),
    (23, 'Understanding Joins', 4, 2, 'Combine data using different types of joins.', 'module_4/2_understanding_joins.md'),
    (24, 'Using Subqueries', 4, 2, 'Write queries inside queries to filter and calculate results.', 'module_4/3_using_subqueries.md'),
    (25, 'Common Table Expressions', 4, 2, 'Simplify complex queries with CTEs for readability and reuse.', 'module_4/4_common_table_expressions.md'),
    (26, 'Creating and Using Views', 4, 2, 'Build reusable query results as virtual tables.', 'module_4/5_creating_and_using_views.md'),
    (27, 'Introduction to Stored Procedures', 4, 2, 'Automate and reuse SQL operations with stored procedures.', 'module_4/6_introduction_to_stored_procedures.md');

-- Exercises for Module 4: Intermediate SQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 5: Advance SQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, description, content_path)
VALUES
    (28, 'What Are Indexes', 5, 3, 'See how indexes speed up queries and when to use them.', 'module_5/1_what_are_indexes.md'),
    (29, 'Types of Indexes', 5, 3, 'Learn the difference between clustered and non-clustered indexes.', 'module_5/2_types_of_indexes.md'),
    (30, 'Query Execution Plans', 5, 3, 'Analyze query plans to identify bottlenecks and improve performance.', 'module_5/3_query_execution_plans.md'),
    (31, 'Transactions', 5, 3, 'Use transactions to group queries and ensure data integrity.', 'module_5/4_transactions.md'),
    (32, 'Concurrency and Isolation Levels', 5, 3, 'Understand how isolation levels handle multiple users working at once.', 'module_5/5_concurrency_and_isolation_levels.md'),
    (33, 'Performance Tuning', 5, 3, 'Apply common strategies for writing efficient SQL queries.', 'module_5/6_performance_tuning.md');

-- Exercises for Module 5: Advance SQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 6: About NoSQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, description, content_path)
VALUES
    (34, 'Introduction to Non-Relational Databases', 6, 1, 'Learn what NoSQL databases are and why they exist.', 'module_6/1_introduction_to_non-relational_databases.md'),
    (35, 'Types of NoSQL Databases', 6, 1, 'Explore key–value, document, column, and graph databases.', 'module_6/2_types_of_nosql_databases.md'),
    (36, 'When to Use NoSQL', 6, 2, 'Decide when each type of database is the right fit.', 'module_6/3_when_to_use_nosql.md'),
    (37, 'Handling Unstructured Data', 6, 2, 'Discover how NoSQL handles unstructured or semi-structured data.', 'module_6/4_handling_unstructured_data.md'),
    (38, 'Scalability and Performance', 6, 3, 'See how NoSQL scales with sharding and replication.', 'module_6/5_scalability_and_performance.md');

-- Exercises for Module 6: About NoSQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- ===== Row Level Security and Privileges =====

-- Enable Row Level Security
ALTER TABLE public.difficulties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Restrict base privileges and grant read-only to authenticated (reference tables)
REVOKE ALL ON TABLE public.difficulties FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.modules FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.lessons FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.exercises FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.progress FROM PUBLIC, anon, authenticated;

GRANT SELECT ON TABLE public.difficulties TO authenticated;
GRANT SELECT ON TABLE public.modules TO authenticated;
GRANT SELECT ON TABLE public.lessons TO authenticated;
GRANT SELECT ON TABLE public.exercises TO authenticated;

-- Progress table: authenticated may perform CRUD, governed by RLS
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.progress TO authenticated;

-- Allow using the sequence for inserts into progress.progress_id
GRANT USAGE, SELECT ON SEQUENCE public.progress_progress_id_seq TO authenticated;

-- RLS policies: ownership-based CRUD for progress
CREATE POLICY "Progress select own rows" ON public.progress
    FOR SELECT TO authenticated
        USING (student_id = auth.uid());

CREATE POLICY "Progress insert own rows" ON public.progress
    FOR INSERT TO authenticated
       WITH CHECK (student_id = auth.uid());

CREATE POLICY "Progress update own rows" ON public.progress
    FOR UPDATE TO authenticated
        USING (student_id = auth.uid())
        WITH CHECK (student_id = auth.uid());

CREATE POLICY "Progress delete own rows" ON public.progress
    FOR DELETE TO authenticated
    USING (student_id = auth.uid());

-- RLS policies: ownership-based CRUD for sandboxes
CREATE POLICY "Sandbox select own rows" ON public.sandboxes
    FOR SELECT TO authenticated
        USING (student_id = auth.uid());

CREATE POLICY "Sandbox insert own rows" ON public.sandboxes
    FOR INSERT TO authenticated
       WITH CHECK (student_id = auth.uid());

CREATE POLICY "Sandbox update own rows" ON public.sandboxes
    FOR UPDATE TO authenticated
        USING (student_id = auth.uid())
        WITH CHECK (student_id = auth.uid());

CREATE POLICY "Sandbox delete own rows" ON public.sandboxes
    FOR DELETE TO authenticated
    USING (student_id = auth.uid());