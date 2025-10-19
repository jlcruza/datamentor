// Sample database tables for query practice
export const sampleTables = {
  estudiantes: [
    { id: 1, nombre: 'Alice Johnson', email: 'alice@email.com', especialidad: 'Ciencia de la Computación', edad: 20, fecha_matricula: '2025-09-01' },
    { id: 2, nombre: 'Bob Smith', email: 'bob@email.com', especialidad: 'Matemáticas', edad: 21, fecha_matricula: '2025-09-01' },
    { id: 3, nombre: 'Charlie Brown', email: 'charlie@email.com', especialidad: 'Ciencia de la Computación', edad: 19, fecha_matricula: '2025-09-01' },
    { id: 4, nombre: 'Diana Prince', email: 'diana@email.com', especialidad: 'Física', edad: 22, fecha_matricula: '2025-09-01' },
    { id: 5, nombre: 'Eve Wilson', email: 'eve@email.com', especialidad: 'Matemáticas', edad: 20, fecha_matricula: '2025-09-01' },
    { id: 6, nombre: 'Frank Miller', email: 'frank@email.com', especialidad: 'Ciencia de la Computación', edad: 21, fecha_matricula: '2025-09-01' },
    { id: 7, nombre: 'Grace Lee', email: 'grace@email.com', especialidad: 'Física', edad: 19, fecha_matricula: '2025-09-01' },
    { id: 8, nombre: 'Henry Davis', email: 'henry@email.com', especialidad: 'Matemáticas', edad: 23, fecha_matricula: '2025-09-01' }
  ],

  cursos: [
    { id: 101, titulo: 'Introducción a la Programación', creditos: 3, departamento: 'Ciencia de la Computación', instructor: 'Dr. Smith' },
    { id: 102, titulo: 'Sistemas de Bases de Datos', creditos: 4, departamento: 'Ciencia de la Computación', instructor: 'Dr. Johnson' },
    { id: 103, titulo: 'Cálculo I', creditos: 4, departamento: 'Matemáticas', instructor: 'Prof. Brown' },
    { id: 104, titulo: 'Álgebra Lineal', creditos: 3, departamento: 'Matemáticas', instructor: 'Prof. Davis' },
    { id: 105, titulo: 'Física I', creditos: 4, departamento: 'Física', instructor: 'Dr. Wilson' },
    { id: 106, titulo: 'Estructuras de Datos', creditos: 3, departamento: 'Ciencia de la Computación', instructor: 'Dr. Miller' },
    { id: 107, titulo: 'Matemáticas Discretas', creditos: 3, departamento: 'Matemáticas', instructor: 'Prof. Lee' }
  ],

  matriculas: [
    { id: 1, id_estudiante: 1, id_curso: 101, nota: 92.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 2, id_estudiante: 1, id_curso: 102, nota: 88.0, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 3, id_estudiante: 2, id_curso: 103, nota: 95.0, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 4, id_estudiante: 2, id_curso: 104, nota: 91.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 5, id_estudiante: 3, id_curso: 101, nota: 87.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 6, id_estudiante: 3, id_curso: 106, nota: 93.0, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 7, id_estudiante: 4, id_curso: 105, nota: 89.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 8, id_estudiante: 5, id_curso: 103, nota: 96.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 9, id_estudiante: 5, id_curso: 107, nota: 94.0, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 10, id_estudiante: 6, id_curso: 101, nota: 85.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 11, id_estudiante: 6, id_curso: 102, nota: 90.0, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 12, id_estudiante: 7, id_curso: 105, nota: 92.0, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' },
    { id: 13, id_estudiante: 8, id_curso: 104, nota: 88.5, semestre: 'Otoño 2025', fecha_matricula: '2025-09-01' }
  ],

  departamentos: [
    { id: 1, nombre: 'Ciencia de la Computación', director: 'Dr. Anderson', presupuesto: 500000, edificio: 'Pabellón de Ciencias' },
    { id: 2, nombre: 'Matemáticas', director: 'Prof. Thompson', presupuesto: 300000, edificio: 'Edificio de Matemáticas' },
    { id: 3, nombre: 'Física', director: 'Dr. Rodriguez', presupuesto: 400000, edificio: 'Laboratorio de Física' }
  ]
};