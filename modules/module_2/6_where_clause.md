## 6. Filtrando Resultados con `WHERE`

### ¿Por Qué Filtrar?

Rara vez querrás ver *toda* la información de una tabla. Lo más común es que busques respuestas a preguntas específicas: "¿Qué estudiantes nacieron después del año 2000?", "¿Qué productos cuestan menos de $50?", "¿Quién es el usuario 'admin'?". La cláusula `WHERE` es la herramienta que te permite hacer estas preguntas y filtrar los datos para obtener solo las filas que te interesan. Es el detective de SQL.

---

### ¿Cómo Funciona `WHERE`?

La cláusula `WHERE` se coloca después de la cláusula `FROM` y antes de otras como `ORDER BY`. Contiene una o más condiciones que deben ser verdaderas para que una fila se incluya en el resultado.
```oracle
SELECT columnas
FROM tabla
WHERE condicion;
```

**Operadores de Comparación:**
- `=`: Igual a
- `!=` o `<>`: Distinto de
- `>`: Mayor que
- `<`: Menor que
- `>=`: Mayor o igual que
- `<=`: Menor o igual que

**Operadores Lógicos:**
- `AND`: Todas las condiciones deben ser verdaderas.
- `OR`: Al menos una de las condiciones debe ser verdadera.
- `NOT`: Niega una condición.

**Otros Operadores Útiles:**
- `BETWEEN x AND y`: El valor está en el rango de `x` a `y` (inclusivo).
- `IN (valor1, valor2, ...)`: El valor coincide con cualquiera de la lista.
- `LIKE`: Búsqueda de patrones en texto (con comodines `%` y `_`).

### Ejemplos Ilustrativos

- **Pregunta:** "Mostrar los estudiantes cuyo apellido es 'Perez'."
```oracle
SELECT Nombre, Apellido
FROM Estudiantes
WHERE Apellido = 'Perez';
```

- **Pregunta:** "Mostrar los estudiantes que nacieron en 1999."
```oracle
SELECT Nombre, Fecha_Nacimiento
FROM Estudiantes
WHERE Fecha_Nacimiento BETWEEN TO_DATE('1999-01-01', 'YYYY-MM-DD') AND TO_DATE('1999-12-31', 'YYYY-MM-DD');
```

- **Pregunta:** "Encontrar estudiantes cuyo email termine en `@example.com`."
```oracle
SELECT Nombre, Email
FROM Estudiantes
WHERE Email LIKE '%@example.com';
```

### Consejos de los Expertos

- **Manejo de `NULL`:** Un valor `NULL` significa "desconocido" o "no aplicable". No puedes compararlo con `=` o `!=`. En su lugar, debes usar `IS NULL` o `IS NOT NULL`.
  `WHERE Apellido IS NULL` (encuentra estudiantes sin apellido registrado).
- **Orden de los Operadores:** Usa paréntesis `()` para agrupar condiciones `AND` y `OR` y asegurar que se evalúen en el orden que deseas, evitando ambigüedades.

---

### Resumen

La cláusula `WHERE` es fundamental para realizar consultas significativas. Te permite pasar de ver un mar de datos a obtener respuestas concretas, filtrando las filas según las condiciones que especifiques.
