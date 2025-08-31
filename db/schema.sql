CREATE TABLE IF NOT EXISTS difficulty(
    difficulty_id   SERIAL          PRIMARY KEY,
    difficulty_name VARCHAR(255)    NOT NULL,
    created_date    TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL    DEFAULT NOW()
    )

CREATE TABLE IF NOT EXISTS modules(
    module_id       SERIAL          PRIMARY KEY,
    module_name     VARCHAR(255)    NOT NULL,
    created_date    TIMESTAMP       NOT NULL    DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons(
    lesson_id       SERIAL          PRIMARY KEY,
    lesson_name     VARCHAR(255)    NOT NULL,
    module_id       INT             REFERENCES modules(module_id),
    difficulty_id   INT             REFERENCES difficulty(difficulty_id),
    created_date    TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified_date   TIMESTAMP       NOT NULL DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS students(
    student_id          SERIAL          PRIMARY KEY,
    student_first_name  VARCHAR(255)    NOT NULL,
    student_last_name   VARCHAR(255)    NOT NULL,
    created_date        TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS progress(
    progress_id         SERIAL          PRIMARY KEY,
    student_id          INT             REFERENCES students(student_id),
    lesson_id           INT             REFERENCES lessons(lesson_id),
    completed           BOOLEAN         NOT NULL DEFAULT FALSE,
    created_date        TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS exercises(
    exercise_id         SERIAL          PRIMARY KEY,
    lesson_id           INT             REFERENCES lessons(lesson_id),
    question            VARCHAR(255)    NOT NULL,
    option_a            VARCHAR(255)    NOT NULL,
    option_b            VARCHAR(255)    NOT NULL,
    option_c            VARCHAR(255)    NOT NULL,
    option_d            VARCHAR(255)    NOT NULL,
    answer              VARCHAR(255)    NOT NULL,
    created_date        TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified_date       TIMESTAMP       NOT NULL DEFAULT NOW()
)