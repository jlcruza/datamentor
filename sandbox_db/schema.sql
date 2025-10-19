-- crea un propietario ligero para tu esquema de semillas
CREATE USER SBX_OWNER IDENTIFIED BY ""
  QUOTA 200M ON DATA;

GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE,
    CREATE PROCEDURE, CREATE TRIGGER TO SBX_OWNER;

CREATE TABLE SBX_OWNER.DEPARTAMENTOS (
  id           NUMBER        PRIMARY KEY,
  nombre       VARCHAR2(100) NOT NULL UNIQUE,
  director     VARCHAR2(100),
  presupuesto  NUMBER(12,2),
  edificio     VARCHAR2(100)
);

CREATE TABLE SBX_OWNER.ESTUDIANTES (
  id                NUMBER         PRIMARY KEY,
  nombre            VARCHAR2(100)  NOT NULL,
  email             VARCHAR2(255)  NOT NULL UNIQUE,
  id_especialidad   NUMBER,
  edad              NUMBER(3),
  fecha_matricula   DATE           NOT NULL,
  CONSTRAINT fk_estudiantes_departamento
    FOREIGN KEY (id_especialidad) REFERENCES SBX_OWNER.DEPARTAMENTOS(id) ON DELETE SET NULL
);

CREATE TABLE SBX_OWNER.CURSOS (
  id              NUMBER         PRIMARY KEY,
  titulo          VARCHAR2(200)  NOT NULL,
  creditos        NUMBER(2)      NOT NULL,
  id_departamento NUMBER,
  instructor      VARCHAR2(100),
  CONSTRAINT fk_cursos_departamento
    FOREIGN KEY (id_departamento) REFERENCES SBX_OWNER.DEPARTAMENTOS(id) ON DELETE SET NULL
);

CREATE TABLE SBX_OWNER.MATRICULAS (
  id                NUMBER        PRIMARY KEY,
  id_estudiante     NUMBER        NOT NULL,
  id_curso          NUMBER        NOT NULL,
  nota              NUMBER(5,2),
  semestre          VARCHAR2(50)  NOT NULL,
  fecha_matricula   DATE          NOT NULL,
  CONSTRAINT fk_matriculas_estudiante
    FOREIGN KEY (id_estudiante) REFERENCES SBX_OWNER.ESTUDIANTES(id) ON DELETE CASCADE,
  CONSTRAINT fk_matriculas_curso
    FOREIGN KEY (id_curso) REFERENCES SBX_OWNER.CURSOS(id) ON DELETE CASCADE,
  CONSTRAINT uq_matricula UNIQUE (id_estudiante, id_curso, semestre)
);

-- Departamentos
INSERT INTO SBX_OWNER.DEPARTAMENTOS (id, nombre, director, presupuesto, edificio) VALUES (1, 'Ciencia de la Computación', 'Dr. Anderson', 500000, 'Pabellón de Ciencias');
INSERT INTO SBX_OWNER.DEPARTAMENTOS (id, nombre, director, presupuesto, edificio) VALUES (2, 'Matemáticas', 'Prof. Thompson', 300000, 'Edificio de Matemáticas');
INSERT INTO SBX_OWNER.DEPARTAMENTOS (id, nombre, director, presupuesto, edificio) VALUES (3, 'Física', 'Dr. Rodriguez', 400000, 'Laboratorio de Física');

-- Estudiantes
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (1, 'Alice Johnson', 'alice@email.com', 1, 20, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (2, 'Bob Smith', 'bob@email.com', 2, 21, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (3, 'Charlie Brown', 'charlie@email.com', 1, 19, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (4, 'Diana Prince', 'diana@email.com', 3, 22, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (5, 'Eve Wilson', 'eve@email.com', 2, 20, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (6, 'Frank Miller', 'frank@email.com', 1, 21, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (7, 'Grace Lee', 'grace@email.com', 3, 19, TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.ESTUDIANTES (id, nombre, email, id_especialidad, edad, fecha_matricula) VALUES (8, 'Henry Davis', 'henry@email.com', 2, 23, TO_DATE('2025-09-01','YYYY-MM-DD'));

-- Cursos
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (101, 'Introducción a la Programación', 3, 1, 'Dr. Smith');
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (102, 'Sistemas de Bases de Datos',   4, 1, 'Dr. Johnson');
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (103, 'Cálculo I',                    4, 2, 'Prof. Brown');
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (104, 'Álgebra Lineal',               3, 2, 'Prof. Davis');
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (105, 'Física I',                     4, 3, 'Dr. Wilson');
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (106, 'Estructuras de Datos',         3, 1, 'Dr. Miller');
INSERT INTO SBX_OWNER.CURSOS (id, titulo, creditos, id_departamento, instructor) VALUES (107, 'Matemáticas Discretas',        3, 2, 'Prof. Lee');

-- Matriculaciones
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (1,  1, 101, 92.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (2,  1, 102, 88.0, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (3,  2, 103, 95.0, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (4,  2, 104, 91.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (5,  3, 101, 87.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (6,  3, 106, 93.0, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (7,  4, 105, 89.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (8,  5, 103, 96.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (9,  5, 107, 94.0, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (10, 6, 101, 85.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (11, 6, 102, 90.0, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (12, 7, 105, 92.0, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
INSERT INTO SBX_OWNER.MATRICULAS (id, id_estudiante, id_curso, nota, semestre, fecha_matricula) VALUES (13, 8, 104, 88.5, 'Otoño 2025', TO_DATE('2025-09-01','YYYY-MM-DD'));
