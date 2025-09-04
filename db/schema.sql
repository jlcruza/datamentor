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
    content         TEXT,
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
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content)
VALUES
    (1, 'Introduction to Databases', 1, 1, 'This is the first lesson'),
    (2, 'Core SQL Skills', 1, 1, 'This is the second lesson'),
    (3, 'Data Modeling and Design', 1, 1, 'This is the third lesson');

-- Exercises for Module 1: Introduction to Databases
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');


-- Lessons for Module 2: Core SQL Skills
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content)
VALUES
    (1, 'Introduction to Databases', 1, 1, 'This is the first lesson'),
    (2, 'Core SQL Skills', 1, 1, 'This is the second lesson'),
    (3, 'Data Modeling and Design', 1, 1, 'This is the third lesson');

-- Exercises for Module 2: Core SQL Skills
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 3: Data Modeling and Design
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content)
VALUES
    (1, 'Introduction to Databases', 1, 1, 'This is the first lesson'),
    (2, 'Core SQL Skills', 1, 1, 'This is the second lesson'),
    (3, 'Data Modeling and Design', 1, 1, 'This is the third lesson');

-- Exercises for Module 3: Data Modeling and Design
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 4: Intermediate SQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content)
VALUES
    (1, 'Introduction to Databases', 1, 1, 'This is the first lesson'),
    (2, 'Core SQL Skills', 1, 1, 'This is the second lesson'),
    (3, 'Data Modeling and Design', 1, 1, 'This is the third lesson');

-- Exercises for Module 4: Intermediate SQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 5: Advance SQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content)
VALUES
    (1, 'Introduction to Databases', 1, 1, 'This is the first lesson'),
    (2, 'Core SQL Skills', 1, 1, 'This is the second lesson'),
    (3, 'Data Modeling and Design', 1, 1, 'This is the third lesson');

-- Exercises for Module 5: Advance SQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');

-- Lessons for Module 6: About NoSQL
INSERT INTO lessons (lesson_id, lesson_name, module_id, difficulty_id, content)
VALUES
    (1, 'Introduction to Databases', 1, 1, 'This is the first lesson'),
    (2, 'Core SQL Skills', 1, 1, 'This is the second lesson'),
    (3, 'Data Modeling and Design', 1, 1, 'This is the third lesson');

-- Exercises for Module 6: About NoSQL
INSERT INTO exercises (lesson_id, question, option_a, option_b, option_c, option_d, answer, reason)
VALUES
    (1, '', '', '', '', '', '', '');