-- create a lightweight owner for your seed schema
CREATE USER SBX_OWNER IDENTIFIED BY ""
  QUOTA 200M ON DATA;

GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE,
    CREATE PROCEDURE, CREATE TRIGGER TO SBX_OWNER;

CREATE TABLE SBX_OWNER.DEPARTMENTS (
  id        NUMBER        PRIMARY KEY,
  name      VARCHAR2(100) NOT NULL UNIQUE,
  head      VARCHAR2(100),
  budget    NUMBER(12,2),
  building  VARCHAR2(100)
);

CREATE TABLE SBX_OWNER.STUDENTS (
  id               NUMBER         PRIMARY KEY,
  name             VARCHAR2(100)  NOT NULL,
  email            VARCHAR2(255)  NOT NULL UNIQUE,
  major_id         NUMBER,
  age              NUMBER(3),
  enrollment_date  DATE           NOT NULL,
  CONSTRAINT fk_students_department
    FOREIGN KEY (major_id) REFERENCES SBX_OWNER.DEPARTMENTS(id) ON DELETE SET NULL
);

CREATE TABLE SBX_OWNER.COURSES (
  id             NUMBER         PRIMARY KEY,
  title          VARCHAR2(200)  NOT NULL,
  credits        NUMBER(2)      NOT NULL,
  department_id  NUMBER,
  instructor     VARCHAR2(100),
  CONSTRAINT fk_courses_department
    FOREIGN KEY (department_id) REFERENCES SBX_OWNER.DEPARTMENTS(id) ON DELETE SET NULL
);

CREATE TABLE SBX_OWNER.ENROLLMENTS (
  id               NUMBER        PRIMARY KEY,
  student_id       NUMBER        NOT NULL,
  course_id        NUMBER        NOT NULL,
  grade            NUMBER(5,2),
  semester         VARCHAR2(50)  NOT NULL,
  enrollment_date  DATE          NOT NULL,
  CONSTRAINT fk_enrollments_student
    FOREIGN KEY (student_id) REFERENCES SBX_OWNER.STUDENTS(id) ON DELETE CASCADE,
  CONSTRAINT fk_enrollments_course
    FOREIGN KEY (course_id) REFERENCES SBX_OWNER.COURSES(id) ON DELETE CASCADE,
  CONSTRAINT uq_enrollment UNIQUE (student_id, course_id, semester)
);

-- Departments
INSERT INTO SBX_OWNER.DEPARTMENTS (id, name, head, budget, building) VALUES (1, 'Computer Science', 'Dr. Anderson', 500000, 'Science Hall');
INSERT INTO SBX_OWNER.DEPARTMENTS (id, name, head, budget, building) VALUES (2, 'Mathematics', 'Prof. Thompson', 300000, 'Math Building');
INSERT INTO SBX_OWNER.DEPARTMENTS (id, name, head, budget, building) VALUES (3, 'Physics', 'Dr. Rodriguez', 400000, 'Physics Lab');

-- Students
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (1, 'Alice Johnson', 'alice@email.com', 1, 20, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (2, 'Bob Smith', 'bob@email.com', 2, 21, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (3, 'Charlie Brown', 'charlie@email.com', 1, 19, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (4, 'Diana Prince', 'diana@email.com', 3, 22, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (5, 'Eve Wilson', 'eve@email.com', 2, 20, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (6, 'Frank Miller', 'frank@email.com', 1, 21, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (7, 'Grace Lee', 'grace@email.com', 3, 19, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.STUDENTS (id, name, email, major_id, age, enrollment_date) VALUES (8, 'Henry Davis', 'henry@email.com', 2, 23, TO_DATE('2025-09-01','YYYY-MM-DD'));

-- Courses
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (101, 'Introduction to Programming', 3, 1, 'Dr. Smith');
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (102, 'Database Systems',            4, 1, 'Dr. Johnson');
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (103, 'Calculus I',                    4, 2, 'Prof. Brown');
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (104, 'Linear Algebra',                3, 2, 'Prof. Davis');
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (105, 'Physics I',                     4, 3, 'Dr. Wilson');
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (106, 'Data Structures',               3, 1, 'Dr. Miller');
INSERT INTO SBX_OWNER.COURSES (id, title, credits, department_id, instructor) VALUES (107, 'Discrete Mathematics',          3, 2, 'Prof. Lee');

-- Enrollments
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (1,  1, 101, 92.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (2,  1, 102, 88.0, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (3,  2, 103, 95.0, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (4,  2, 104, 91.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (5,  3, 101, 87.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (6,  3, 106, 93.0, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (7,  4, 105, 89.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (8,  5, 103, 96.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (9,  5, 107, 94.0, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (10, 6, 101, 85.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (11, 6, 102, 90.0, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (12, 7, 105, 92.0, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ENROLLMENTS (id, student_id, course_id, grade, semester, enrollment_date) VALUES (13, 8, 104, 88.5, 'Fall 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
