## Lección 4: Tablas, Columnas y Filas: La Estructura Fundamental

### Abriendo el archivador digital: ¿qué hay dentro?

Hemos hablado de que las bases de datos relacionales (como Oracle) organizan los datos. Ahora vamos a ver exactamente cómo. La estructura es sorprendentemente simple y se basa en tres conceptos clave: **tablas, columnas y filas**.

---

### Términos Clave

Antes de continuar, definamos los conceptos fundamentales que utilizaremos:

- **Entidad:** Un objeto, persona, lugar o concepto del mundo real sobre el que queremos almacenar información. En una base de datos, cada entidad se representa como una tabla. Ejemplos: Estudiante, Curso, Departamento.
- **Atributo:** Una propiedad o característica que describe a una entidad. En una base de datos, cada atributo se convierte en una columna de la tabla. Ejemplos: nombre, edad, email.
- **Registro:** Una instancia específica de una entidad, representada como una fila en la tabla. Ejemplo: un estudiante específico llamado "Carlos Pérez".
- **Tipo de dato:** La categoría que define qué tipo de información puede almacenarse en una columna (números, texto, fechas, etc.).

---

### ¿Por qué esta estructura?

Imagina que quieres almacenar información sobre los estudiantes de una universidad. ¿Cómo lo harías? Probablemente crearías una cuadrícula, ¿verdad?

- El título de la cuadrícula sería "Estudiantes".
- Las cabeceras de las columnas serían "ID", "Nombre", "Email" y "Edad".
- Cada renglón de la cuadrícula contendría la información de un estudiante específico.

¡Felicidades, acabas de diseñar la estructura básica de una base de datos relacional! Esta organización es intuitiva, eficiente y la base de todo lo que haremos con SQL.

### Los tres pilares: Tabla, Columna y Fila

1.  **Tabla (Table):**
    - **¿Qué es?** Es el contenedor principal de los datos sobre un tema específico o entidad.
    - **Analogía:** Piensa en una tabla como una **hoja de cálculo** dentro de un libro de Excel. Puedes tener una hoja para "Estudiantes", otra para "Cursos" y otra para "Departamentos".
    - **Ejemplo:** La tabla `ESTUDIANTES`.

2.  **Columna (Column):**
    - **¿Qué es?** Define un atributo o una característica de la entidad que la tabla representa. Cada columna tiene un nombre y un tipo de dato específico (número, texto, fecha, etc.).
    - **Analogía:** Es la **cabecera de una columna** en tu hoja de cálculo.
    - **Ejemplo:** En la tabla `ESTUDIANTES`, algunas columnas serían `ID`, `NOMBRE`, `EMAIL` y `FECHA_MATRICULA`.

3.  **Fila (Row):**
    - **¿Qué es?** Es un registro único de datos que representa una instancia de la entidad. Contiene un valor para cada columna de la tabla.
    - **Analogía:** Es una **fila completa** de datos en tu hoja de cálculo.
    - **Ejemplo:** Una fila en la tabla `ESTUDIANTES` sería `(1, 'Alice Johnson', 'alice@email.com', 20, '01-SEP-2025')`.

### Ejemplo en Oracle SQL

Así es como esta estructura se traduce a código. ¡No te preocupes por memorizar la sintaxis ahora, solo observa cómo se conectan los conceptos!

```oracle
-- Este código crea la estructura de nuestra tabla en una base de datos Oracle.
-- CREATE TABLE es el comando para crear una nueva tabla.
CREATE TABLE ALUMNOS (
    -- Aquí definimos las columnas y sus tipos de datos.
    ID_ALUMNO           NUMBER,         -- NUMBER para números enteros.
    NOMBRE              VARCHAR2(50),   -- VARCHAR2 para texto de longitud variable.
    APELLIDO            VARCHAR2(50),
    FECHA_NACIMIENTO    DATE            -- DATE para fechas.
);
```

### Consejos de los Expertos

> Elige nombres para tus tablas y columnas que sean **claros, descriptivos y consistentes**. Usa `NOMBRE_COMPLETO` en lugar de `nom` o `nc`. Evita espacios y caracteres especiales. Un buen nombramiento hace que tus bases de datos sean auto-documentadas y mucho más fáciles de usar para ti y para otros en el futuro.

---

### Resumen de la Lección 4

- Las bases de datos relacionales organizan los datos en **tablas**.
- Una **tabla** representa una entidad (como `ESTUDIANTES`).
- Una **columna** representa un atributo de esa entidad (como `NOMBRE`).
- Una **fila** representa un registro único de esa entidad (un estudiante específico).
