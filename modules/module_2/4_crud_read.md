## 4. Obteniendo Datos con `SELECT` (CRUD: Leer)

### ¿Por Qué Leer Datos?

Has creado tus tablas y las has llenado de datos valiosos. ¿Ahora qué? El propósito principal de una base de datos es permitirte consultar esa información para responder preguntas, generar informes y alimentar aplicaciones. `SELECT` es tu herramienta principal para explorar y extraer los datos. Es como hacerle una pregunta a tu base de datos.

---

### Términos Clave

Antes de aprender a consultar datos, entendamos estos conceptos:

- **SELECT:** Comando SQL para consultar y recuperar datos de una o más tablas.
- **FROM:** Cláusula que especifica de qué tabla(s) se obtendrán los datos.
- **Comodín (*):** Símbolo que representa "todas las columnas". `SELECT *` significa "seleccionar todas las columnas".
- **Alias:** Un nombre alternativo temporal que se le da a una columna o tabla en los resultados de una consulta. Se utiliza con la palabra clave `AS`.
- **Consulta (Query):** Una instrucción SELECT que solicita datos específicos de la base de datos.

---

### La Anatomía de `SELECT`

`SELECT` es el comando más versátil de SQL. En su forma más simple, se ve así:
```oracle
SELECT columna1, columna2, ...
FROM nombre_de_la_tabla;
```

- Para obtener todas las columnas, puedes usar el comodín `*`:
```oracle
SELECT *
FROM Estudiantes;
```

- Para obtener solo columnas específicas:
```oracle
SELECT Nombre, Apellido, Email
FROM Estudiantes;
```

### Ejemplos Ilustrativos

- **Pregunta:** "¿Cuáles son los nombres y apellidos de todos mis estudiantes?"
```oracle
SELECT Nombre, Apellido
FROM Estudiantes;
```

- **Pregunta:** "Necesito toda la información disponible sobre los estudiantes."
```oracle
SELECT *
FROM Estudiantes;
```

### Consejos de los Expertos

- **Evita `SELECT *` en Código de Producción:** Aunque `SELECT *` es útil para exploraciones rápidas, es una mala práctica en el código de una aplicación. ¿Por qué?
    1. **Rendimiento:** Pides más datos de los que necesitas, lo que aumenta el tráfico de red y la carga en la base de datos.
    2. **Fragilidad:** Si alguien añade o elimina una columna de la tabla, el código de tu aplicación que espera un número específico de columnas podría romperse.
- **Usa Alias para Mayor Claridad:** Puedes renombrar las columnas en los resultados de tu consulta usando la palabra clave `AS` (aunque es opcional en Oracle). Esto hace que los resultados sean más legibles.
```oracle
SELECT Nombre AS Nombre_Estudiante, Email AS Correo_Electronico
FROM Estudiantes;
```

---

### Resumen

`SELECT` te permite leer y analizar los datos. Puedes elegir exactamente qué piezas de información quieres ver de tus tablas. Ser específico con las columnas que seleccionas es una práctica clave para escribir consultas eficientes y mantenibles.
