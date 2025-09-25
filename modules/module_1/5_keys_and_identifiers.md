## Lección 5: Claves e Identificadores: La Clave Primaria

### ¿Cómo encontramos una aguja en un pajar?

Imagina nuestra tabla `ALUMNOS` con 30,000 estudiantes. Si hay dos estudiantes llamados "Carlos Pérez", ¿cómo sabemos a cuál de ellos debemos actualizarle la calificación? Necesitamos una forma de identificar **inequívocamente** cada fila.

Esa es la misión de la **clave primaria** (*Primary Key*).

---

### ¿Por qué las claves son la pieza más importante del puzzle?

Sin un identificador único, tus datos son un desastre esperando a ocurrir.
- **Ambigüedad:** No puedes estar seguro de qué registro estás modificando o eliminando.
- **Duplicados:** Podrías insertar al mismo estudiante dos veces por error.
- **Sin relaciones:** Como veremos más adelante, las claves son el pegamento que nos permite conectar unas tablas con otras (por ejemplo, para saber qué cursos ha tomado un estudiante).

La clave primaria impone la **integridad y unicidad** de los datos. Es una regla no negociable.

### ¿Cómo funciona? Las dos reglas de oro de la Clave Primaria

Una clave primaria es una columna (o un conjunto de columnas) que identifica de forma única cada fila en una tabla. Para ser una clave primaria, debe cumplir dos reglas estrictas:

1.  **Debe ser ÚNICA:** No pueden existir dos filas en la misma tabla con el mismo valor en la columna de clave primaria.
2.  **No puede ser NULA:** Cada fila debe tener obligatoriamente un valor en su clave primaria. No puede dejarse en blanco.

#### Analogías y Ejemplos Ilustrativos:

- **El DNI o Cédula de Identidad:** Dos personas pueden llamarse igual, pero nunca tendrán el mismo número de identificación. Ese número es una clave primaria en la "base de datos" de un país.
- **El número de serie de un producto:** Identifica un dispositivo específico de forma única en todo el mundo.
- **El `ID_ALUMNO`:** En nuestra tabla `ALUMNOS`, la columna `ID_ALUMNO` es la candidata perfecta para ser la clave primaria. Cada estudiante tendrá un número único e irrepetible.

### Ejemplo en Oracle SQL

Ahora, modifiquemos nuestra tabla para definir `ID_ALUMNO` como la clave primaria.

```oracle
-- Al añadir "PRIMARY KEY", le decimos a Oracle que esta columna
-- debe ser única y no nula. Oracle forzará esta regla automáticamente.
CREATE TABLE ALUMNOS (
    ID_ALUMNO        NUMBER CONSTRAINT pk_alumnos PRIMARY KEY,
    NOMBRE           VARCHAR2(50),
    APELLIDO         VARCHAR2(50),
    FECHA_NACIMIENTO DATE
);
-- El "CONSTRAINT pk_alumnos" es simplemente una forma de darle un nombre
-- a nuestra regla de clave primaria, lo cual es una buena práctica.
```

Si ahora intentáramos insertar dos alumnos con el mismo `ID_ALUMNO`, Oracle nos daría un error. ¡La base de datos está protegiendo la integridad de nuestros datos!

### Consejos de los Experts

> A menudo, el mejor tipo de clave primaria es un número entero que se incrementa automáticamente por cada nueva fila. Esto se conoce como **clave subrogada** (*surrogate key*). No tiene ningún significado "de negocio" (como un DNI), pero es perfecta para la base de datos porque es simple, numérica y su unicidad está garantizada. En Oracle, esto se logra con un objeto llamado `SEQUENCE` y/o con columnas de identidad (`IDENTITY COLUMNS`).

---

### Resumen de la Lección 5

- Una **clave primaria** es una columna (o columnas) que identifica de forma única cada fila de una tabla.
- **Reglas:** Debe ser **única** y **no nula**.
- **Propósito:** Evitar la duplicidad y la ambigüedad, y servir como base para relacionar tablas.
- En Oracle, se define con la restricción `PRIMARY KEY`.

¡Felicidades! Has completado el Módulo 1. Ahora tienes los cimientos teóricos para entender por qué las bases de datos son tan poderosas y cómo se estructuran. En el Módulo 2, nos arremangaremos y empezaremos a escribir código SQL para interactuar con ellas.