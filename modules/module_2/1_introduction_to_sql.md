## 1. Introducción a SQL y su Sintaxis Básica

### ¿Por Qué Aprender SQL?

Imagina que una base de datos es una biblioteca gigantesca y perfectamente organizada. Contiene millones de libros (datos), pero no puedes simplemente entrar y tomar lo que quieras. Necesitas hablar con el bibliotecario (el Sistema Gestor de Bases de Datos o DBMS) para pedirle exactamente lo que buscas. SQL (Structured Query Language) es el idioma universal que todos los bibliotecarios de bases de datos relacionales entienden. Aprender SQL te da el poder de hacer preguntas precisas y obtener respuestas exactas de tus datos.

---

### Términos Clave

Antes de comenzar a escribir SQL, familiaricémonos con los conceptos fundamentales:

- **SQL (Structured Query Language - Lenguaje de Consulta Estructurado):** El lenguaje estándar para comunicarse con bases de datos relacionales. Permite crear, leer, actualizar y eliminar datos.
- **Lenguaje Declarativo:** Un tipo de lenguaje de programación donde describes *qué* quieres obtener, no *cómo* obtenerlo. El sistema se encarga de los detalles de implementación.
- **DDL (Data Definition Language - Lenguaje de Definición de Datos):** Conjunto de comandos SQL para definir y modificar la estructura de la base de datos (CREATE, ALTER, DROP).
- **DML (Data Manipulation Language - Lenguaje de Manipulación de Datos):** Conjunto de comandos SQL para trabajar con los datos dentro de las tablas (SELECT, INSERT, UPDATE, DELETE).
- **Consulta (Query):** Una instrucción SQL que solicita información de la base de datos.
- **Cláusula:** Una parte de una instrucción SQL que realiza una función específica (SELECT, FROM, WHERE, etc.).

---

### ¿Qué es SQL?

SQL es un lenguaje de programación diseñado para una sola cosa: gestionar y manipular datos en una base de datos relacional. No es un lenguaje de propósito general como Python o Java, sino un lenguaje declarativo. Esto significa que le *dices* a la base de datos *qué* datos quieres, no *cómo* obtenerlos. El DBMS se encarga de la parte difícil.

Los comandos de SQL se dividen en varias categorías, pero las más importantes para empezar son:
- **DDL (Data Definition Language - Lenguaje de Definición de Datos):** Para definir la estructura de la base de datos (`CREATE`, `ALTER`, `DROP`).
- **DML (Data Manipulation Language - Lenguaje de Manipulación de Datos):** Para manipular los datos dentro de las tablas (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).

### Sintaxis Básica

Una consulta SQL se compone de cláusulas y se termina con un punto y coma (`;`).
```oracle
SELECT columna1, columna2
FROM nombre_de_la_tabla
WHERE condicion;
```

- `SELECT`: Especifica las columnas que quieres ver.
- `FROM`: Indica la tabla de la que quieres obtener los datos.
- `WHERE`: Filtra los registros para obtener solo los que cumplen una condición (opcional).

### Consejos de los Expertos

- **Mayúsculas vs. Minúsculas:** Por convención, los comandos de SQL como `SELECT` y `FROM` se escriben en mayúsculas para mejorar la legibilidad. Los nombres de tablas y columnas se escriben tal como fueron creados. Oracle no distingue mayúsculas y minúsculas en los nombres de objetos (tablas, columnas) a menos que se creen usando comillas dobles.
- **Legibilidad:** ¡No escribas todo en una sola línea! Usa saltos de línea y sangría para que tus consultas sean fáciles de leer y depurar.

---

### Resumen

SQL es el lenguaje para comunicarte con bases de datos relacionales. Su sintaxis declarativa te permite solicitar, insertar, actualizar y borrar datos de manera eficiente. La estructura básica de una consulta es `SELECT`, `FROM`, y opcionalmente `WHERE`.
