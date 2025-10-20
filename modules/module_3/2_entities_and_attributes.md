## Lección 2: Entidades y Atributos

### ¿Por qué debo aprender esto?
Para construir nuestro "plano", necesitamos los bloques de construcción fundamentales. Estos son las "cosas" sobre las que queremos guardar información (Entidades) y las "características" de esas cosas (Atributos). Entenderlos es el primer paso práctico para traducir el mundo real a un diseño de base de datos.

---

### Explicación del Concepto
*   **Entidad:** Es cualquier objeto, persona, lugar o concepto del mundo real sobre el que queremos almacenar información. **En una base de datos, una entidad se convierte en una tabla.**
*   **Atributo:** Es una propiedad o característica que describe a una entidad. **En una base de datos, un atributo se convierte en una columna dentro de una tabla.**

### Ejemplos Ilustrativos y Analogías
*   **Entidad:** `ESTUDIANTES`
    *   **Atributos:** `id`, `nombre`, `email`, `id_especialidad`, `edad`, `fecha_matricula`.
*   **Entidad:** `CURSOS`
    *   **Atributos:** `id`, `titulo`, `creditos`, `id_departamento`, `instructor`.

Así es como la entidad `ESTUDIANTES` se traduce a una tabla en SQL:
```oracle
CREATE TABLE ESTUDIANTES (
    id               NUMBER PRIMARY KEY,
    nombre           VARCHAR2(100) NOT NULL,
    email            VARCHAR2(255) NOT NULL UNIQUE,
    id_especialidad  NUMBER,
    edad             NUMBER(3),
    fecha_matricula  DATE NOT NULL
);
```

### Consejos de los Expertos
*   **Usa Nombres Claros y Consistentes:** `id_estudiante` es mucho mejor que `idest` o `sid`. La claridad previene confusiones.
*   **Elige el Tipo de Dato Correcto:** No almacenes fechas en una columna de texto (`VARCHAR2`). Usar el tipo de dato adecuado (como `DATE` o `NUMBER`) garantiza la integridad de los datos y mejora el rendimiento.
*   **Una Entidad, Un Concepto:** Evita mezclar información no relacionada en una sola tabla. La tabla `Estudiantes` no debería contener el `nombre_del_curso`. Para eso existen las relaciones, que veremos pronto.

---

### Resumen
Las entidades son los sustantivos de nuestra base de datos (se convierten en tablas) y los atributos son sus adjetivos (se convierten en columnas). Definir correctamente las entidades y sus atributos es el primer paso para crear una estructura de datos limpia y organizada.
