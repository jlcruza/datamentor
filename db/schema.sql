CREATE TABLE IF NOT EXISTS difficulty(
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
    module_id       INT             REFERENCES  modules(module_id),
    difficulty_id   INT             REFERENCES  difficulty(difficulty_id),
    content_path    TEXT            NOT NULL,
    created_date    TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students(
    student_id          VARCHAR(255)    NOT NULL        PRIMARY KEY,
    student_first_name  VARCHAR(255)    NOT NULL,
    student_last_name   VARCHAR(255)    NOT NULL,
    created_date        TIMESTAMP       NOT NULL        DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL        DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress(
    progress_id         SERIAL          PRIMARY KEY,
    student_id          VARCHAR(255)    REFERENCES students(student_id),
    lesson_id           INT             REFERENCES lessons(lesson_id),
    completed           BOOLEAN         NOT NULL DEFAULT FALSE,
    created_date        TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exercises(
    exercise_id         SERIAL          PRIMARY KEY,
    lesson_id           INT             REFERENCES lessons(lesson_id),
    question            VARCHAR(255)    NOT NULL,
    option_a            VARCHAR(255)    NOT NULL,
    option_b            VARCHAR(255)    NOT NULL,
    option_c            VARCHAR(255)    NOT NULL,
    option_d            VARCHAR(255)    NOT NULL,
    answer              VARCHAR(255)    NOT NULL,
    reason              VARCHAR(255)    NOT NULL,
    created_date        TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL DEFAULT NOW()
);

INSERT INTO difficulty (difficulty_id, difficulty_name) VALUES
    (1, 'beginner'),
    (2, 'intermediate'),
    (3, 'advanced');

INSERT INTO modules (module_id, module_name) VALUES
    (1, 'Introduction to Databases'),
    (2, 'Core SQL Skills'),
    (3, 'Data Modeling and Design'),
    (4, 'Intermediate SQL'),
    (5, 'Advance SQL'),
    (6, 'About NoSQL');

-- Lessons for Module 1: Introduction to Databases
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content_path)
VALUES
    (1, 'What is a database', 1, 1, 'module_1/1_what_is_a_database.md'),
    (2, 'Data in Everyday Life', 1, 1, 'module_1/2_data_in_everyday_life.md'),
    (3, 'Database Management Systems', 1, 1, 'module_1/3_database_management_systems.md'),
    (4, 'Tables, Columns, and Rows', 1, 1, 'module_1/4_tables_columns_rows.md'),
    (5, 'Keys and Identifiers', 1, 1, 'module_1/5_keys_and_identifiers.md');

-- Exercises for Module 1: Introduction to Databases
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');


-- Lessons for Module 2: Core SQL Skills
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content_path)
VALUES
    (1, 'Introduction to SQL', 2, 1, 'module_2/1_introduction_to_sql.md'),
    (2, 'Tables and Data Types', 2, 1, 'module_2/2_tables_and_data_types.md'),
    (3, 'CRUD - Create & Update', 2, 1, 'module_2/3_crud_create_and_update.md'),
    (4, 'CRUD - Read', 2, 1, 'module_2/4_crud_read.md'),
    (5, 'CRUD - Delete', 2, 1, 'module_2/5_crud_delete.md'),
    (6, 'WHERE Clause', 2, 1, 'module_2/6_where_clause.md'),
    (7, 'Sorting Results', 2, 1, 'module_2/7_sorting_results.md'),
    (8, 'Aggregation Functions', 2, 1, 'module_2/8_aggregation_functions.md'),
    (9, 'Grouping and Filtering', 2, 1, 'module_2/9_grouping_and_filtering.md');

-- Exercises for Module 2: Core SQL Skills
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 3: Data Modeling and Design
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content_path)
VALUES
    (1, 'Why Data Modeling Matters', 3, 1, 'module_3/1_why_data_modeling_matters.md'),
    (2, 'Entities and Attributes', 3, 1, 'module_3/2_entities_and_attributes.md'),
    (3, 'Relationships Between Tables', 3, 1, 'module_3/3_relationships_between_tables.md'),
    (4, 'Primary and Foreign Keys', 3, 1, 'module_3/4_primary_and_foreign_keys.md'),
    (5, 'Entity–Relationship Diagrams', 3, 1, 'module_3/5_entity_relationship_diagrams.md'),
    (6, 'Normalization', 3, 1, 'module_3/6_normalization.md'),
    (7, 'When and Why to Denormalize', 3, 1, 'module_3/7_when_and_why_to_denormalize.md');

-- Exercises for Module 3: Data Modeling and Design
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 4: Intermediate SQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content_path)
VALUES
    (1, 'Working with Multiple Tables', 4, 2, 'module_4/1_working_with_multiple_tables.md'),
    (2, 'Understanding Joins', 4, 2, 'module_4/2_understanding_joins.md'),
    (3, 'Using Subqueries', 4, 2, 'module_4/3_using_subqueries.md'),
    (4, 'Common Table Expressions', 4, 2, 'module_4/4_common_table_expressions.md'),
    (5, 'Creating and Using Views', 4, 2, 'module_4/5_creating_and_using_views.md'),
    (6, 'Introduction to Stored Procedures', 4, 2, 'module_4/6_introduction_to_stored_procedures.md');

-- Exercises for Module 4: Intermediate SQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 5: Advance SQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content_path)
VALUES
    (1, 'What Are Indexes', 5, 3, 'module_5/1_what_are_indexes.md'),
    (2, 'Types of Indexes', 5, 3, 'module_5/2_types_of_indexes.md'),
    (3, 'Query Execution Plans', 5, 3, 'module_5/3_query_execution_plans.md'),
    (4, 'Transactions', 5, 3, 'module_5/4_transactions.md'),
    (5, 'Concurrency and Isolation Levels', 5, 3, 'module_5/5_concurrency_and_isolation_levels.md'),
    (6, 'Performance Tuning', 5, 3, 'module_5/6_performance_tuning.md');

-- Exercises for Module 5: Advance SQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 6: About NoSQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content_path)
VALUES
    (1, 'Introduction to Non-Relational Databases', 6, 1, 'module_6/1_introduction_to_non-relational_databases.md'),
    (2, 'Types of NoSQL Databases', 6, 1, 'module_6/2_types_of_nosql_databases.md'),
    (3, 'When to Use NoSQL', 6, 2, 'module_6/3_when_to_use_nosql.md'),
    (4, 'Handling Unstructured Data', 6, 2, 'module_6/4_handling_unstructured_data.md'),
    (5, 'Scalability and Performance', 6, 3, 'module_6/5_scalability_and_performance.md');

-- Exercises for Module 6: About NoSQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');